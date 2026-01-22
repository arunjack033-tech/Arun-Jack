import { transporter } from '@/lib/mailer'

export async function POST(req) {
    try {
        const { userEmail, userName, serviceName, bookingDate } = await req.json()

        await transporter.sendMail({
            from: '"UrbanConnect" <no-reply@urbanconnect.com>',
            to: userEmail,
            subject: 'Booking Confirmation ✅',
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
                        <h1 style="margin:0; font-size: 24px;">Booking Service Confirmed!</h1>
                    </div>
                    <div class="m-body">
                        <h2>Hi ${userName},</h2>
                        <p>Your service booking is confirmed 🎉</p>
                        
                        <div class="m-detail">
                            <strong>Service:</strong> ${serviceName}
                        </div>
                        <div class="m-detail">
                            <strong>Date/Time:</strong> ${bookingDate}
                        </div>

                        <p>Thank you for using <b>UrbanConnect</b>.</p>
                    </div>
                    <div class="m-footer">
                        &copy; ${new Date().getFullYear()} UrbanConnect.
                    </div>
                </div>
            </body>
            </html>
            `,
        })

        return Response.json({ success: true })
    } catch (error) {
        console.error(error)
        return Response.json({ success: false }, { status: 500 })
    }
}
