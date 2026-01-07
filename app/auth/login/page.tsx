"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
    const supabase = createClient();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error) router.push("/dashboard");
        else alert(error.message);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#05070d] text-white">
            <div className="w-full max-w-md p-8 rounded-2xl bg-[#0b0f1a] border border-white/10 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input onChange={e => setEmail(e.target.value)} placeholder="Email"
                    className="w-full mb-3 p-3 rounded bg-black/40 border border-white/10" />
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"
                    className="w-full mb-5 p-3 rounded bg-black/40 border border-white/10" />
                <button onClick={handleLogin}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold text-black">
                    Login
                </button>
            </div>
        </div>
    );
}
