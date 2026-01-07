import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function AppShell({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen bg-[#0b0f1a] text-white">

            {/* Top Premium Navbar */}
            <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-blue-400">UrbanConnect</h1>

                    <div className="flex gap-6 items-center text-sm text-gray-300">
                        <Link href="/services">Find Service</Link>
                        <Link href="/my-bookings">My Bookings</Link>
                        <Link href="/dashboard">Dashboard</Link>

                        {user ? (
                            <Link href="/auth/logout"
                                className="px-4 py-1 rounded-full border border-red-500 text-red-400 hover:bg-red-500/10">
                                Sign Out
                            </Link>
                        ) : (
                            <>
                                <Link href="/auth/login">Login</Link>
                                <Link href="/auth/signup"
                                    className="px-4 py-1 rounded-full bg-blue-600 text-white">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Page Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {children}
            </main>
        </div>
    );
}
