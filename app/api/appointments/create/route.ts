import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const supabase = await createClient();
    const body = await req.json();

    const {
        provider_id,
        service_id,
        appointment_date,
        appointment_time,
    } = body;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // ✅ INSERT APPOINTMENT (CORRECT)
    const { error } = await supabase.from("appointments").insert({
        user_id: user.id,
        provider_id,
        service_id,
        appointment_date,
        appointment_time,
        status: "PENDING",
    });

    if (error) {
        console.error("Booking Table Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // ✅ SEND EMAIL (NO DB COLUMNS USED)
    try {
        const { transporter } = await import("@/lib/mailer");

        await transporter.sendMail({
            from: '"UrbanConnect" <no-reply@urbanconnect.com>',
            to: user.email!,
            subject: "Booking Confirmation ✅",
            html: `
        <h2>Booking Confirmed 🎉</h2>
        <p>Your service has been booked successfully.</p>
        <p><strong>Date:</strong> ${appointment_date}</p>
        <p><strong>Time:</strong> ${appointment_time}</p>
      `,
        });

    } catch (emailErr) {
        console.error("Email sending failed:", emailErr);
    }

    return NextResponse.json({ success: true });
}
