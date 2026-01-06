import { supabaseServer } from "@/lib/supabaseServer";
import { sendEmail } from "@/lib/sendEmail";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { appointmentId, userEmail, userName, date } = await req.json();

    await supabaseServer
        .from("appointments")
        .update({ status: "ACCEPTED" })
        .eq("id", appointmentId);

    await sendEmail({
        to: userEmail,
        subject: "Appointment Accepted",
        html: `<p>Hello ${userName}, your appointment on <b>${date}</b> has been accepted.</p>`,
    });

    return NextResponse.json({ success: true });
}
