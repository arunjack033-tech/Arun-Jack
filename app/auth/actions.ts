
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // Type-casting for safety
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        redirect('/auth?mode=login&error=Could not authenticate user')
    }

    // Check user role to redirect appropriately
    const { data: { user } } = await supabase.auth.getUser()
    const role = user?.user_metadata?.role || 'customer'

    revalidatePath('/', 'layout')

    if (role === 'provider') {
        redirect('/dashboard/provider')
    } else {
        redirect('/dashboard/customer')
    }
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const role = formData.get('role') as string
    const name = formData.get('name') as string

    console.log('Signup attempt:', { email, role, name })

    let signUpError = null;
    let signUpData = null;

    try {
        const result = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    role: role,
                    full_name: name
                }
            }
        });

        if (result.error) {
            signUpError = result.error;
        } else {
            signUpData = result.data;
        }
    } catch (err: any) {
        // Fallback for unexpected throws
        signUpError = { message: err.message || "Unknown error during signup mechanism" };
    }

    if (signUpError) {
        console.error('Signup error:', signUpError)
        redirect(`/auth?mode=signup&error=${encodeURIComponent(signUpError.message)}`)
    }

    // Send Welcome Email via Brevo
    try {
        const { sendEmail } = await import('@/utils/brevo');
        const { getWelcomeEmailTemplate } = await import('@/utils/email-templates');

        await sendEmail({
            to: [{ email: email, name: name }],
            subject: 'Welcome to UrbanConnect! 🚀',
            htmlContent: getWelcomeEmailTemplate(name, role)
        });
    } catch (emailError) {
        // Log but don't fail the registration if email fails
        console.error("Failed to send welcome email:", emailError);
    }

    revalidatePath('/', 'layout')
    redirect('/auth?mode=login&message=Account created! Please check your email to confirm.')
}

export async function signout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/auth?mode=login')
}
