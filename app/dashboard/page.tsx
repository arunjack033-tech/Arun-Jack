"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Dashboard() {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) {
                router.push("/auth/login"); // not logged in → login
            } else {
                setUser(data.user);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen container mx-auto text-white pb-20 pt-32">
            <h1 className="text-4xl font-bold title-gradient mb-4">
                Dashboard
            </h1>

            <p className="text-gray-400 mb-10">
                Welcome back, {user?.email}
            </p>

            <div className="grid md:grid-cols-3 gap-6">

                {/* Customer Section */}
                <Link
                    href="/services"
                    className="glass-panel p-8 hover:bg-slate-800/50 transition-all border-l-4 border-l-blue-500 group"
                >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
                    <h2 className="text-2xl font-bold mb-2">Find Services</h2>
                    <p className="text-gray-400">Browse and book professionals.</p>
                </Link>

                <Link
                    href="/my-bookings"
                    className="glass-panel p-8 hover:bg-slate-800/50 transition-all border-l-4 border-l-purple-500 group"
                >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📅</div>
                    <h2 className="text-2xl font-bold mb-2">My Bookings</h2>
                    <p className="text-gray-400">Check status of your appointments.</p>
                </Link>

                {/* Profile */}
                <Link
                    href="/profile"
                    className="glass-panel p-8 hover:bg-slate-800/50 transition-all border-l-4 border-l-cyan-500 group"
                >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">👤</div>
                    <h2 className="text-2xl font-bold mb-2">My Profile</h2>
                    <p className="text-gray-400">Manage your account details.</p>
                </Link>

                {/* Provider Portal */}
                <Link
                    href="/dashboard/provider"
                    className="glass-panel p-8 hover:bg-slate-800/50 transition-all border-l-4 border-l-green-500 group opacity-60 hover:opacity-100"
                >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💼</div>
                    <h2 className="text-2xl font-bold mb-2">Provider Portal</h2>
                    <p className="text-gray-400">For service professionals only.</p>
                </Link>
            </div>
        </div>
    );
}
