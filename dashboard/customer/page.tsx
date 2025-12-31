
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { signout } from '@/app/auth/actions';

export default async function CustomerDashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    // Double check role protection although login action handles redirect
    if (user?.user_metadata?.role !== 'customer') {
        // If a provider tries to access customer dashboard, redirect them
        if (user?.user_metadata?.role === 'provider') {
            redirect('/dashboard/provider');
        }
    }

    return (
        <div className="container py-12">
            <div className="glass-panel p-8 mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
                    <p className="text-[var(--text-muted)]">Welcome back, {user.user_metadata.full_name || 'Customer'}</p>
                </div>
                <form action={signout}>
                    <button className="text-sm border border-red-500/50 text-red-200 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors">
                        Sign Out
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {/* Stats Cards */}
                <div className="glass-panel p-6">
                    <h3 className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Active Bookings</h3>
                    <p className="text-4xl font-bold text-white">0</p>
                </div>
                <div className="glass-panel p-6">
                    <h3 className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Total Spent</h3>
                    <p className="text-4xl font-bold text-white">$0</p>
                </div>
                <div className="glass-panel p-6">
                    <h3 className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Saved Pros</h3>
                    <p className="text-4xl font-bold text-white">0</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">Recent Bookings</h2>
            <div className="glass-panel p-8 text-center text-[var(--text-muted)]">
                <p>No bookings yet.</p>
                <a href="/services" className="btn-primary inline-block mt-4 px-6 py-2 text-sm">Find a Service</a>
            </div>
        </div>
    );
}
