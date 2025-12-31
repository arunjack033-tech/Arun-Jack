# UrbanConnect

UrbanConnect is a full-stack web application connecting customers with local service providers.

## Features

- **Premium UI**: Modern glassmorphism design with responsive layouts.
- **Dual Roles**: Sign up as a **Customer** or **Service Provider**.
- **Service Listings**: Browse categories like Cleaning, Plumbing, Electrician.
- **Authentication**: Secure Supabase Auth with server-side protection.
- **Dashboards**: Dedicated portals for Customers (Active Bookings) and Providers (Earnings/Jobs).

## Project Structure

- `/app`: Next.js App Router pages and layouts.
  - `/auth`: Login, Signup, and Auth Actions.
  - `/dashboard`: Protected Customer and Provider dashboards.
  - `/services`: Public service listings.
  - `/provider`: Public provider profiles.
- `/components`: Reusable UI components (Navbar, Footer).
- `/utils/supabase`: Supabase Client, Server, and Middleware utilities.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Rename `.env.local.example` to `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
   *Note: You must enable Email Auth in your Supabase project.*

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Usage

1. Go to **Sign Up** and choose "Hire a Pro" or "Work as a Pro".
2. After signup, check your email to confirm (if email confirmation is enabled in Supabase) or check the Supabase dashboard to verify the user.
3. Log in to be redirected to your specific dashboard.
