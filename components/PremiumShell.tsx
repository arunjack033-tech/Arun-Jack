import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function PremiumShell({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen w-full bg-[#05070d] text-white flex justify-center items-start pt-6 px-3 sm:px-6">
            <div className="w-full max-w-7xl bg-[#0b0f1a]/95 rounded-3xl border border-white/10 shadow-2xl">


                {/* Floating Navbar */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 backdrop-blur-xl">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-blue-500 to-cyan-400">
                        UrbanConnect
                    </h1>


                    <div className="flex items-center gap-8 text-gray-300">
                        <Link href="/services">Find Service</Link>
                        <Link href="/dashboard">Dashboard</Link>
                        <Link href="/my-bookings">My Bookings</Link>

                        {user ? (
                            <Link href="/auth/logout" className="px-5 py-1.5 rounded-full border border-red-500 text-red-400">
                                Sign Out
                            </Link>
                        ) : (
                            <>
                                <Link href="/auth/login" className="px-5 py-1.5 rounded-full border border-white/20">
                                    Log In
                                </Link>
                                <Link href="/auth/signup"
                                    className="px-5 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-12">
                    {children}
                </div>
            </div>
        </div>
    );
}
