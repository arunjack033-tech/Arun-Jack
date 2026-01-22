"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function DashboardHeader() {
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });

        const { data: listener } =
            supabase.auth.onAuthStateChange((_event, session) => {
                setUser(session?.user ?? null);
            });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <header className="fixed top-6 z-50 w-full px-4">
            <div className="mx-auto max-w-7xl h-20 flex items-center justify-between rounded-2xl bg-[#0b0f1a]/80 backdrop-blur-xl border border-white/10 px-6">

                <Link href="/" className="text-xl font-bold text-white">
                    Urban<span className="text-blue-400">Connect</span>
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="text-sm text-gray-300">
                                {user.email?.split("@")[0]}
                            </span>
                            <button
                                onClick={async () => {
                                    await supabase.auth.signOut();
                                }}
                                className="text-red-400 font-semibold"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="text-gray-300">
                                Login
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
