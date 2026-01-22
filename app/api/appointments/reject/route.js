import { createClient } from "@/utils/supabase/server";
import { sendEmail } from "@/lib/sendEmail";
import { NextResponse } from "next/server";

export async function POST(req) {
    const supabase = await createClient();
    const { appointmentId, userEmail, userName, date } = await req.json();

    await supabase
        .from("appointments")
        .update({ status: "REJECTED" })
        .eq("id", appointmentId);

    await sendEmail({
        to: userEmail,
        subject: "Appointment Rejected",
        html: `<p>Hello ${userName}, unfortunately your appointment on <b>${date}</b> was rejected.</p>`,
    });

    return NextResponse.json({ success: true });
}
