
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { signout } from '@/app/auth/actions';

export default async function ProviderDashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    if (user?.user_metadata?.role !== 'provider') {
        if (user?.user_metadata?.role === 'customer') {
            redirect('/dashboard/customer');
        }
    }

    return (
        <div className="container py-12">
            <div className="glass-panel p-8 mb-8 flex justify-between items-center bg-gradient-to-r from-[var(--glass-bg)] to-[rgba(var(--secondary-h),var(--secondary-s),var(--secondary-l),0.1)]">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Provider Portal</h1>
                    <p className="text-[var(--text-muted)]">Welcome back, {user.user_metadata.full_name || 'Pro'}</p>
                </div>
                <div className="flex gap-4">
                    <button className="btn-primary text-sm px-4 py-2">Edit Profile</button>
                    <form action={signout}>
                        <button className="text-sm border border-red-500/50 text-red-200 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors">
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {/* Stats Cards */}
                <div className="glass-panel p-6">
                    <h3 className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Earnings</h3>
                    <p className="text-3xl font-bold text-white">$0.00</p>
                </div>
                <div className="glass-panel p-6">
                    <h3 className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Jobs Done</h3>
                    <p className="text-3xl font-bold text-white">0</p>
                </div>
                <div className="glass-panel p-6">
                    <h3 className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Rating</h3>
                    <p className="text-3xl font-bold text-white">5.0</p>
                </div>
                <div className="glass-panel p-6">
                    <h3 className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Views</h3>
                    <p className="text-3xl font-bold text-white">0</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-white mb-6">Upcoming Jobs</h2>
                    <div className="glass-panel p-8 text-center text-[var(--text-muted)]">
                        <p>No upcoming jobs assigned.</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
                    <div className="glass-panel p-6">
                        <ul className="space-y-4 text-sm text-[var(--text-muted)]">
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                                <span>Account created successfully.</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                                <span>Profile is pending verification.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
