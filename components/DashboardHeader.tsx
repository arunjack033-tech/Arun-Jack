import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardHeader() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="w-full bg-[#0b0f1a] border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                <h1 className="text-xl font-bold text-blue-400">UrbanConnect</h1>

                <div className="flex gap-6 items-center text-gray-300">
                    <Link href="/services">Find Service</Link>
                    <Link href="/my-bookings">My Bookings</Link>
                    <Link href="/dashboard">Dashboard</Link>

                    {user ? (
                        <Link href="/auth/logout" className="px-4 py-1 rounded-full border border-red-500 text-red-400">
                            Sign Out
                        </Link>
                    ) : (
                        <>
                            <Link href="/auth/login">Login</Link>
                            <Link href="/auth/signup" className="px-4 py-1 rounded-full bg-blue-600 text-white">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
