import { sendEmail } from "@/lib/sendEmail";
import { NextResponse } from "next/server";

export async function GET() {
    await sendEmail({
        to: "yourgmail@gmail.com",
        subject: "Test Email",
        html: "<h1>Email working!</h1>",
    });

    return NextResponse.json({ success: true });
}
