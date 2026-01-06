'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { login, signup } from './actions';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

function AuthFormContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [role, setRole] = useState<'customer' | 'provider'>('customer');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const m = searchParams.get('mode');
        if (m === 'signup') setMode('signup');
        else if (m === 'login') setMode('login');
    }, [searchParams]);

    const handleModeChange = (newMode: 'login' | 'signup') => {
        setMode(newMode);
        // Update URL without full reload if possible, or just push
        const params = new URLSearchParams(searchParams.toString());
        params.set('mode', newMode);
        router.push(`/auth?${params.toString()}`);
    };

    return (
        <div className="glass-panel w-full max-w-md p-8 md:p-10 relative overflow-hidden transition-all duration-500">
            {/* Decorative background blob */}
            <div className={`absolute top-20 -left-20 w-40 h-40 bg-[var(--secondary)] rounded-full blur-[60px] opacity-20 pointer-events-none transition-all duration-700 ${mode === 'signup' ? 'translate-x-[300px] bg-[var(--primary)]' : ''}`}></div>

            <div className="relative z-10">
                {/* Mode Switcher */}
                <div className="flex bg-[rgba(0,0,0,0.3)] p-1 rounded-xl mb-8 border border-[rgba(255,255,255,0.05)]">
                    <button
                        onClick={() => handleModeChange('login')}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${mode === 'login'
                            ? 'bg-[var(--surface)] text-white shadow-lg bg-opacity-100'
                            : 'text-[var(--text-muted)] hover:text-white'
                            }`}
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => handleModeChange('signup')}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${mode === 'signup'
                            ? 'bg-[var(--surface)] text-white shadow-lg bg-opacity-100'
                            : 'text-[var(--text-muted)] hover:text-white'
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 transition-all">
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        {mode === 'login' ? 'Log in to access your dashboard.' : 'Join UrbanConnect today.'}
                    </p>
                </div>

                {searchParams.get('message') && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-200 text-sm mb-6 text-center animate-pulse">
                        {searchParams.get('message')}
                    </div>
                )}
                {searchParams.get('error') && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm mb-6 text-center">
                        {searchParams.get('error')}
                    </div>
                )}

                <form className="flex flex-col gap-5">
                    {mode === 'signup' && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                            <label className="block text-xs text-[var(--text-muted)] mb-2 uppercase tracking-wider font-semibold">I want to</label>
                            <div className="grid grid-cols-2 gap-4 p-1 bg-[rgba(0,0,0,0.2)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                                <button
                                    type="button"
                                    onClick={() => setRole('customer')}
                                    className={`py-3 rounded-lg text-sm font-medium transition-all duration-300 ${role === 'customer'
                                        ? 'bg-[var(--surface)] text-white shadow-lg border border-[rgba(255,255,255,0.1)]'
                                        : 'text-[var(--text-muted)] hover:text-white'
                                        }`}
                                >
                                    Hire a Pro
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('provider')}
                                    className={`py-3 rounded-lg text-sm font-medium transition-all duration-300 ${role === 'provider'
                                        ? 'bg-[var(--surface)] text-white shadow-lg border border-[rgba(255,255,255,0.1)]'
                                        : 'text-[var(--text-muted)] hover:text-white'
                                        }`}
                                >
                                    Work as a Pro
                                </button>
                            </div>
                            <input type="hidden" name="role" value={role} />
                        </div>
                    )}

                    {mode === 'signup' && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
                            <label className="block text-xs text-[var(--text-muted)] mb-1 uppercase tracking-wider">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder={role === 'customer' ? "Jane User" : "Pro Handyman"}
                                className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-gray-600"
                                required
                            />
                        </div>
                    )}

                    <div className={mode === 'signup' ? "animate-in fade-in slide-in-from-top-4 duration-500 delay-150" : ""}>
                        <label className="block text-xs text-[var(--text-muted)] mb-1 uppercase tracking-wider">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <div className={mode === 'signup' ? "animate-in fade-in slide-in-from-top-4 duration-500 delay-200" : ""}>
                        <div className="flex justify-between mb-1">
                            <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider">Password</label>
                            {mode === 'login' && <Link href="#" className="text-xs text-[var(--primary)] hover:underline">Forgot?</Link>}
                        </div>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete={mode === 'login' ? "current-password" : "new-password"}
                                placeholder="••••••••"
                                className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-gray-600 pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        formAction={mode === 'login' ? login : signup}
                        className="btn-primary w-full py-3.5 mt-2 text-lg shadow-lg hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all duration-300"
                    >
                        {mode === 'login' ? 'Log In' : (role === 'customer' ? 'Sign Up as Customer' : 'Sign Up as Provider')}
                    </button>
                </form>

                {mode === 'login' && (
                    <p className="text-center text-sm text-[var(--text-muted)] mt-6">
                        New to UrbanConnect? <button onClick={() => handleModeChange('signup')} className="text-[var(--primary)] hover:underline font-medium">Create an account</button>
                    </p>
                )}
                {mode === 'signup' && (
                    <p className="text-center text-sm text-[var(--text-muted)] mt-6">
                        Already have an account? <button onClick={() => handleModeChange('login')} className="text-[var(--primary)] hover:underline font-medium">Log In</button>
                    </p>
                )}
            </div>
        </div>
    );
}

export default function AuthForm() {
    return (
        <Suspense fallback={<div className="glass-panel p-10 text-white">Loading...</div>}>
            <AuthFormContent />
        </Suspense>
    )
}
