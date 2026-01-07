
# ⚠️ Sender Identity Warning

Your app is configured to send emails from `no-reply@urbanconnect.com`.

Since you are using a new Brevo account, you cannot simply send from any random domain (like urbanconnect.com) unless you have verified it.

### 🛠️ The Fix

1.  **Check your Brevo Account**:
    - Login to Brevo.
    - Go to **Senders & IPs**.
    - You will see one verified email (probably the one you used to sign up, e.g., `yourname@gmail.com`).

2.  **Update Your Code**:
    - Open `utils/brevo.ts`.
    - Change line 34 to use your **verified** email address.

    **Before:**
    ```typescript
    sendSmtpEmail.sender = { "name": "UrbanConnect", "email": "no-reply@urbanconnect.com" };
    ```

    **After (Example):**
    ```typescript
    sendSmtpEmail.sender = { "name": "UrbanConnect", "email": "your-verified-email@gmail.com" };
    ```

If you don't do this, Brevo might block your emails!
