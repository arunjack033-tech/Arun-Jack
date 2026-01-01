
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
        redirect('/auth/login?error=Could not authenticate user')
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

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                role: role,
                full_name: name
            }
        }
    })

    if (error) {
        console.error('Signup error:', error)
        redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/auth/login?message=Check email to continue sign in process')
}

export async function signout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/auth/login')
}
