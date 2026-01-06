
export const getWelcomeEmailTemplate = (name: string, role: string) => {
    const isProvider = role === 'provider';
    const actionUrl = "https://urban-connect-app.vercel.app/auth?mode=login"; // Update with actual domain if different

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to UrbanConnect</title>
    <style>
        body { margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%); padding: 40px 20px; text-align: center; }
        .logo { color: white; font-size: 24px; font-weight: bold; text-decoration: none; display: inline-block; }
        .content { padding: 40px 30px; color: #334155; line-height: 1.6; }
        .h1 { font-size: 24px; font-weight: 700; color: #1e293b; margin-top: 0; margin-bottom: 20px; }
        .btn { display: inline-block; background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; text-align: center; }
        .btn:hover { background-color: #4f46e5; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        .role-badge { display: inline-block; background-color: #e0e7ff; color: #4338ca; padding: 4px 12px; border-radius: 9999px; font-size: 14px; font-weight: 600; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div style="padding: 40px 0;">
        <div class="container">
            <div class="header">
                <div class="logo">UrbanConnect</div>
            </div>
            <div class="content">
                <span class="role-badge">${isProvider ? 'Service Provider' : 'Customer Account'}</span>
                <h1 class="h1">Welcome, ${name}!</h1>
                <p>We are absolutely thrilled to have you on board. Your account has been successfully created.</p>
                
                ${isProvider
            ? `<p>As a Pro partner, you are now part of a community dedicated to delivering excellence. Complete your profile to start receiving job leads immediately.</p>`
            : `<p>You are now just one step away from finding the best professionals for your home needs. Browse services and book with confidence.</p>`
        }
                
                <center>
                    <a href="${actionUrl}" class="btn">Access Your Dashboard</a>
                </center>
                
                <p style="margin-top: 30px; font-size: 14px;">If you didn't create this account, you can safely ignore this email.</p>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} UrbanConnect Inc. <br/>
                Reliable Services, Right at Your Doorstep.
            </div>
        </div>
    </div>
</body>
</html>
    `;
};

export const getBookingEmailTemplate = (
    name: string,
    mode: 'customer' | 'provider',
    details: { service: string; date: string; otherParty: string }
) => {
    const isCustomer = mode === 'customer';
    const actionUrl = "https://urban-connect-app.vercel.app/dashboard";

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Update</title>
    <style>
        body { margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px 20px; text-align: center; }
        .logo { color: white; font-size: 24px; font-weight: bold; text-decoration: none; display: inline-block; }
        .content { padding: 40px 30px; color: #334155; line-height: 1.6; }
        .h1 { font-size: 22px; font-weight: 700; color: #1e293b; margin-top: 0; margin-bottom: 20px; }
        .detail-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eef2ff; padding-bottom: 10px; }
        .detail-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .label { color: #64748b; font-size: 14px; }
        .value { color: #0f172a; font-weight: 600; font-size: 14px; }
        .btn { display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 10px; text-align: center; }
        .btn:hover { background-color: #059669; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div style="padding: 40px 0;">
        <div class="container">
            <div class="header">
                <div class="logo">UrbanConnect</div>
            </div>
            <div class="content">
                <h1 class="h1">
                    ${isCustomer ? 'Appointment Received' : 'New Job Alert'}
                </h1>
                
                <p>
                    ${isCustomer
            ? `Hi ${name}, your request has been sent successfully. The provider will review it shortly.`
            : `Hello ${name}, you have a new appointment request. Review the details below.`
        }
                </p>
                
                <div class="detail-box">
                    <div class="detail-row">
                        <span class="label">Service</span>
                        <span class="value">${details.service}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Date</span>
                        <span class="value">${details.date}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">${isCustomer ? 'Provider' : 'Customer'}</span>
                        <span class="value">${details.otherParty}</span>
                    </div>
                </div>
                
                <center>
                    <a href="${actionUrl}" class="btn">View in Dashboard</a>
                </center>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} UrbanConnect Inc.
            </div>
        </div>
    </div>
</body>
</html>
    `;
};
