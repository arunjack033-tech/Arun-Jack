'use client';

import { useState } from 'react';
import { signup } from '../actions';

export default function RolesForm() {
    const [role, setRole] = useState<'customer' | 'provider'>('customer');

    return (
        <form className="flex flex-col gap-5">
            <input type="hidden" name="role" value={role} />

            {/* Role Selection */}
            <div>
                <label className="block text-xs text-[var(--text-muted)] mb-2 uppercase tracking-wider font-semibold">I want to</label>
                <div className="grid grid-cols-2 gap-4 p-1 bg-[rgba(0,0,0,0.2)] rounded-xl">
                    <button
                        type="button"
                        onClick={() => setRole('customer')}
                        className={`py-3 rounded-lg text-sm font-medium transition-all ${role === 'customer'
                            ? 'bg-[var(--surface)] text-white shadow-lg'
                            : 'text-[var(--text-muted)] hover:text-white'
                            }`}
                    >
                        Hire a Pro
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('provider')}
                        className={`py-3 rounded-lg text-sm font-medium transition-all ${role === 'provider'
                            ? 'bg-[var(--surface)] text-white shadow-lg'
                            : 'text-[var(--text-muted)] hover:text-white'
                            }`}
                    >
                        Work as a Pro
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-xs text-[var(--text-muted)] mb-1 uppercase tracking-wider">Full Name</label>
                <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                    required
                />
            </div>

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
                <label className="block text-xs text-[var(--text-muted)] mb-1 uppercase tracking-wider">Password</label>
                <input
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                    required
                />
            </div>

            <button formAction={signup} className="btn-primary w-full py-3 mt-2 text-lg shadow-lg">
                Sign Up as {role === 'customer' ? 'Customer' : 'Provider'}
            </button>
        </form>
    );
}
