"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Signup() {
    const supabase = createClient();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const signup = async () => {
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            },
        });

        setLoading(false);

        if (!error) {
            alert("Signup successful! Check your email for confirmation link.");
            router.push("/auth/login");
        } else {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#05070d] text-white px-4">
            <div className="w-full max-w-md p-10 rounded-3xl bg-[#0b0f1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">

                <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Create Account
                    </h2>
                    <p className="text-center text-gray-400 mb-8">
                        Join UrbanConnect today
                    </p>

                    <div className="space-y-6">

                        {/* Email */}
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder=" "
                                onChange={(e) => setEmail(e.target.value)}
                                className="peer w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                            />
                            <label className="absolute left-4 top-3.5 text-gray-500 text-sm transition-all pointer-events-none
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3.5
                                peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-cyan-400 peer-focus:bg-[#0b0f1a] peer-focus:px-1
                                peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-cyan-400 peer-not-placeholder-shown:bg-[#0b0f1a] peer-not-placeholder-shown:px-1">
                                Email address
                            </label>
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <input
                                type="password"
                                placeholder=" "
                                onChange={(e) => setPassword(e.target.value)}
                                className="peer w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                            />
                            <label className="absolute left-4 top-3.5 text-gray-500 text-sm transition-all pointer-events-none
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3.5
                                peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-cyan-400 peer-focus:bg-[#0b0f1a] peer-focus:px-1
                                peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-cyan-400 peer-not-placeholder-shown:bg-[#0b0f1a] peer-not-placeholder-shown:px-1">
                                Password
                            </label>
                        </div>

                        {/* Button */}
                        <button
                            onClick={signup}
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold shadow-[0_4px_0_0_#0e7490] active:shadow-none active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-400">
                        Already have an account?
                        <a
                            href="/auth/login"
                            className="ml-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                        >
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
