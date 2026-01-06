
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const supabase = await createClient();
    const body = await req.json();

    const {
        user_id,
        user_name,
        user_email,
        provider_id,
        provider_name,
        service_name,
        date,
    } = body;

    // 1️⃣ INSERT APPOINTMENT
    const { error } = await supabase.from("appointments").insert({
        user_id,
        user_name,
        user_email,
        provider_id,
        provider_name,
        service_name,
        date,
        status: "PENDING",
    });

    if (error) {
        console.error("Booking Table Error:", error);
        // We still allow success to be returned if it was a permissions issue locally but we want to simulate success for the demo
        // UNLESS it's a critical failure. Ideally we return 500.
        // For now, let's log and return error
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // 2️⃣ EMAIL TO CUSTOMER & PROVIDER
    try {
        const { sendEmail } = await import('@/utils/brevo');
        const { getBookingEmailTemplate } = await import('@/utils/email-templates');

        // Email to Customer
        await sendEmail({
            to: [{ email: user_email, name: user_name }],
            subject: 'Appointment Requested - UrbanConnect',
            htmlContent: getBookingEmailTemplate(user_name, 'customer', {
                service: service_name,
                date: date,
                otherParty: provider_name
            })
        });

        // Email to Provider (Mocked email for now, or user_email for test)
        // In a real app, you would fetch the provider's email from the DB via provider_id
        // For this demo, we'll log it or send to the same user for testing purposes if you wish
        // await sendEmail({ ... })
        console.log("Mock Provider Email Sent");

    } catch (emailErr) {
        console.error("Email sending failed:", emailErr);
    }

    return NextResponse.json({ success: true });
}
