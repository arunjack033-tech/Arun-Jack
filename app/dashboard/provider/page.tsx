import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProviderDashboard() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    if (user?.user_metadata?.role !== "provider") {
        if (user?.user_metadata?.role === "customer") {
            redirect("/dashboard/customer");
        }
    }

    // ✅ FETCH PROVIDER APPOINTMENTS
    const { data: appointments } = await supabase
        .from("appointments")
        .select("*")
        .eq("provider_id", user.id)
        .order("created_at", { ascending: false });

    return (
        <div className="container py-12">
            {/* HEADER */}
            <div className="glass-panel p-8 mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Provider Portal
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Welcome back, {user.user_metadata.full_name || "Pro"}
                    </p>
                </div>

                <div className="flex gap-4">
                    <button className="btn-primary text-sm px-4 py-2">
                        Edit Profile
                    </button>

                    {/* ✅ FIXED SIGN OUT */}
                    <Link
                        href="/auth/logout"
                        className="text-sm border border-red-500/50 text-red-200 hover:bg-red-500/10 px-4 py-2 rounded-lg"
                    >
                        Sign Out
                    </Link>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="glass-panel p-6">
                    <h3 className="text-sm text-[var(--text-muted)] mb-2">Jobs</h3>
                    <p className="text-3xl font-bold text-white">
                        {appointments?.length || 0}
                    </p>
                </div>
                <div className="glass-panel p-6">
                    <h3 className="text-sm text-[var(--text-muted)] mb-2">Earnings</h3>
                    <p className="text-3xl font-bold text-white">$0</p>
                </div>
                <div className="glass-panel p-6">
                    <h3 className="text-sm text-[var(--text-muted)] mb-2">Rating</h3>
                    <p className="text-3xl font-bold text-white">5.0</p>
                </div>
                <div className="glass-panel p-6">
                    <h3 className="text-sm text-[var(--text-muted)] mb-2">Views</h3>
                    <p className="text-3xl font-bold text-white">0</p>
                </div>
            </div>

            {/* APPOINTMENTS */}
            <h2 className="text-2xl font-bold text-white mb-6">
                Appointment Requests
            </h2>

            {appointments && appointments.length > 0 ? (
                <div className="space-y-4">
                    {appointments.map((appt: any) => (
                        <div
                            key={appt.id}
                            className="glass-panel p-6 flex flex-col gap-2"
                        >
                            <p className="text-white font-semibold">
                                Customer: {appt.user_name}
                            </p>
                            <p className="text-sm text-[var(--text-muted)]">
                                Date: {appt.date}
                            </p>
                            <p className="text-sm">
                                Status:{" "}
                                <span className="text-[var(--primary)]">
                                    {appt.status}
                                </span>
                            </p>

                            {appt.status === "PENDING" && (
                                <div className="flex gap-3 mt-3">
                                    <form action="/api/appointments/accept" method="POST">
                                        <input type="hidden" name="appointmentId" value={appt.id} />
                                        <button className="px-4 py-1 rounded bg-green-600 text-white">
                                            Accept
                                        </button>
                                    </form>

                                    <form action="/api/appointments/reject" method="POST">
                                        <input type="hidden" name="appointmentId" value={appt.id} />
                                        <button className="px-4 py-1 rounded bg-red-600 text-white">
                                            Reject
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="glass-panel p-8 text-center text-[var(--text-muted)]">
                    No appointments yet.
                </div>
            )}
        </div>
    );
}
