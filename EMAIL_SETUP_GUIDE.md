
# 📧 How to Setup Brevo Email for UrbanConnect

This guide explains how the email system works line-by-line and how to get your API key.

## 1. What is Brevo?
Brevo (formerly Sendinblue) is a service that lets apps send emails automatically. We use it to send:
- **Welcome Emails**: When a user signs up.
- **Booking Confirmations**: When a user books a service.

## 2. The Code Explanation

### The Utility File (`utils/brevo.ts`)
This file is the "bridge" between our app and Brevo.
- **Line 2**: We import the `brevo` library.
- **Line 5**: We create a new `apiInstance`. Think of this as opening a secure line to Brevo.
- **Line 9**: We look for your password (`BREVO_API_KEY`) in the `.env.local` file.
- **Line 25**: We define the `sendEmail` function. This function takes the *To*, *Subject*, and *Content* and passes it to Brevo to deliver.

### The Templates (`utils/email-templates.ts`)
Instead of writing ugly HTML inside our code, we keep it here.
- `getWelcomeEmailTemplate`: Generates a beautiful "Welcome" email HTML.
- `getBookingEmailTemplate`: Generates the "Appointment Received" email HTML.

## 3. YOUR STEP-BY-STEP SETUP

### Step 1: Create a Brevo Account
1. Go to [Brevo.com](https://www.brevo.com/) and Sign Up (it's free).
2. Complete the setup (select "Transactional Emails" if asked).

### Step 2: Get Your API Key
1. Click on your profile name (top right) -> **SMTP & API**.
2. Click **Create a new API Key**.
3. Name it "UrbanConnect".
4. **COPY** the long key that starts with `xkeysib-...`.

### Step 3: Add Key to UrbanConnect
1. Return to your code editor.
2. Open the file named `.env.local` in the root folder.
3. Find the line:
   ```env
   BREVO_API_KEY=
   ```
4. Paste your key after the equal sign:
   ```env
   BREVO_API_KEY=xkeysib-123456789abcdef...
   ```
5. **Save the file.**

### Step 4: Verify Sender
1. In Brevo, ensure the email address you use (e.g., your login email) is effective.
2. Our code tries to send from `no-reply@urbanconnect.com`. If Brevo blocks this, change line 34 in `utils/brevo.ts` to your own email address for testing.

## 4. Testing
1. Stop the server (`Ctrl+C` in terminal).
2. Run `npm run dev` again.
3. Sign up a new user. You should receive an email!
