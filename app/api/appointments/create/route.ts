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

    // Fetch Service Details to get Name
    const { data: serviceData } = await supabase
        .from("services")
        .select("name")
        .eq("id", service_id)
        .single();

    const serviceName = serviceData?.name || "Unknown Service";

    // ✅ INSERT APPOINTMENT (CORRECT)
    const { error } = await supabase.from("appointments").insert({
        user_id: user.id,
        provider_id,
        service_id,
        service_name: serviceName, // Added based on schema
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
            subject: "Booking Confirmed - UrbanConnect ✅",
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px; }
                    .m-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                    .m-header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px; text-align: center; color: white; }
                    .m-body { padding: 40px 30px; color: #334155; }
                    .m-detail { background: #f8fafc; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #3b82f6; }
                    .m-footer { background: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 12px; }
                    .m-btn { display: inline-block; background: #3b82f6; color: white; text-decoration: none; padding: 12px 24px; border-radius: 25px; font-weight: bold; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="m-container">
                    <div class="m-header">
                        <h1 style="margin:0; font-size: 24px;">Booking Confirmed!</h1>
                        <p style="opacity: 0.8; margin-top: 5px;">We're ready to serve you.</p>
                    </div>
                    <div class="m-body">
                        <h2>Hello,</h2>
                        <p>Your appointment has been successfully scheduled. Here are your booking details:</p>
                        
                        <div class="m-detail">
                            <strong>📅 Date:</strong> ${appointment_date}
                        </div>
                        <div class="m-detail">
                            <strong>⏰ Time:</strong> ${appointment_time}
                        </div>

                        <p>Our professional service provider will arrive at the scheduled time. Please ensure you are available.</p>
                        
                        <center>
                            <a href="http://localhost:3000/my-bookings" class="m-btn">View My Bookings</a>
                        </center>
                    </div>
                    <div class="m-footer">
                        &copy; ${new Date().getFullYear()} UrbanConnect. All rights reserved.<br>
                        Need help? Contact support@urbanconnect.com
                    </div>
                </div>
            </body>
            </html>
            `,
        });

    } catch (emailErr) {
        console.error("Email sending failed:", emailErr);
    }

    return NextResponse.json({ success: true });
}
