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
        const { error } = await supabase.auth.signUp({ email, password });
        setLoading(false);
        if (!error) router.push("/dashboard");
        else alert(error.message);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] px-4">
            <div className="glass-panel w-full max-w-md p-10 animate-fade">

                <h2 className="text-3xl font-bold text-center mb-1">Create Account</h2>
                <p className="text-center text-muted mb-8">Start using UrbanConnect</p>

                <div className="space-y-6">
                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            placeholder=" "
                            onChange={e => setEmail(e.target.value)}
                            className="w-full p-4 radius-md bg-black/40 border border-[var(--glass-border)] text-white focus:outline-none focus:border-cyan-400 transition"
                        />
                        <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm transition-all">
                            Email address
                        </label>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder=" "
                            onChange={e => setPassword(e.target.value)}
                            className="w-full p-4 radius-md bg-black/40 border border-[var(--glass-border)] text-white focus:outline-none focus:border-cyan-400 transition"
                        />
                        <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm transition-all">
                            Password
                        </label>
                    </div>

                    {/* Button */}
                    <button
                        onClick={signup}
                        disabled={loading}
                        className="btn-primary w-full"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </div>
            </div>
        </div>
    );
}
