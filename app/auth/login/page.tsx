
import Link from 'next/link';
import { login } from '../actions';

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string; error: string }>
}) {
    const params = await searchParams;

    return (
        <div className="container min-h-[80vh] flex items-center justify-center py-12">
            <div className="glass-panel w-full max-w-md p-8 md:p-10 relative overflow-hidden">
                {/* Decorative background blob */}
                <div className="absolute top-20 -left-20 w-40 h-40 bg-[var(--secondary)] rounded-full blur-[60px] opacity-20 pointer-events-none"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
                    <p className="text-[var(--text-muted)] text-center mb-8">Log in to your account.</p>

                    {params?.message && (
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-200 text-sm mb-6 text-center">
                            {params.message}
                        </div>
                    )}
                    {params?.error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm mb-6 text-center">
                            {params.error}
                        </div>
                    )}

                    <form className="flex flex-col gap-5">
                        <div>
                            <label className="block text-xs text-[var(--text-muted)] mb-1 uppercase tracking-wider">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="john@example.com"
                                className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider">Password</label>
                                <Link href="#" className="text-xs text-[var(--primary)] hover:underline">Forgot?</Link>
                            </div>
                            <input
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                                required
                            />
                        </div>

                        <button formAction={login} className="btn-primary w-full py-3 mt-2 text-lg shadow-lg">
                            Log In
                        </button>
                    </form>

                    <p className="text-center text-sm text-[var(--text-muted)] mt-6">
                        Don't have an account? <Link href="/auth/signup" className="text-[var(--primary)] hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
