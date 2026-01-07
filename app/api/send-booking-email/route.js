import { transporter } from '@/lib/mailer'

export async function POST(req) {
    try {
        const { userEmail, userName, serviceName, bookingDate } = await req.json()

        await transporter.sendMail({
            from: '"UrbanConnect" <no-reply@urbanconnect.com>',
            to: userEmail,
            subject: 'Booking Confirmation ✅',
            html: `
        <h2>Hi ${userName},</h2>
        <p>Your service booking is confirmed 🎉</p>

        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date:</strong> ${bookingDate}</p>

        <br />
        <p>Thank you for using <b>UrbanConnect</b>.</p>
      `,
        })

        return Response.json({ success: true })
    } catch (error) {
        console.error(error)
        return Response.json({ success: false }, { status: 500 })
    }
}
