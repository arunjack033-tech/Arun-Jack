
import Link from 'next/link';
import RolesForm from './RolesForm';

export default function SignupPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string; error: string }>
}) {
    return (
        <div className="container min-h-[80vh] flex items-center justify-center py-12">
            <div className="glass-panel w-full max-w-md p-8 md:p-10 relative overflow-hidden">
                {/* Decorative background blob */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--primary)] rounded-full blur-[60px] opacity-30 pointer-events-none"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h1>
                    <p className="text-[var(--text-muted)] text-center mb-8">Join UrbanConnect today.</p>

                    <SuspenseWrapper searchParams={searchParams} />

                    <RolesForm />

                    <p className="text-center text-sm text-[var(--text-muted)] mt-6">
                        Already have an account? <Link href="/auth/login" className="text-[var(--primary)] hover:underline">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

// Separate component to handle searchParams async unwrapping cleanly in server component
async function SuspenseWrapper({ searchParams }: { searchParams: Promise<{ message: string; error: string }> }) {
    const params = await searchParams;
    if (params?.error) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm mb-6 text-center">
                {params.error}
            </div>
        )
    }
    return null;
}
