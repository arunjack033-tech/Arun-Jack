"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
    const supabase = createClient();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (!error) router.push("/dashboard");
        else alert(error.message);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#05070d] text-white px-4">
            <div className="w-full max-w-md p-10 rounded-3xl bg-[#0b0f1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Welcome Back</h2>
                    <p className="text-center text-gray-400 mb-8">Sign in to your UrbanConnect account</p>

                    <div className="space-y-5">
                        <div className="group">
                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Email</label>
                            <input
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Password</label>
                            <input
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-[0_4px_0_0_#1e3a8a] active:shadow-none active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-400">
                        Don't have an account?
                        <a href="/auth/signup" className="ml-1 text-blue-400 hover:text-blue-300 font-medium transition-colors">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
