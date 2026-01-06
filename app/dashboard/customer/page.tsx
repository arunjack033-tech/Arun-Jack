import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signout } from "@/app/auth/actions";

export default async function CustomerDashboard() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    if (user?.user_metadata?.role !== "customer") {
        redirect("/dashboard/provider");
    }

    // ✅ FETCH USER APPOINTMENTS
    const { data: appointments } = await supabase
        .from("appointments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    return (
        <div className="container py-12">
            {/* HEADER */}
            <div className="glass-panel p-8 mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        My Appointments
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Track your bookings and status
                    </p>
                </div>

                <form action={signout}>
                    <button className="text-sm border border-red-500/50 text-red-200 hover:bg-red-500/10 px-4 py-2 rounded-lg">
                        Sign Out
                    </button>
                </form>
            </div>

            {/* APPOINTMENTS */}
            {appointments && appointments.length > 0 ? (
                <div className="space-y-4">
                    {appointments.map((appt: any) => (
                        <div
                            key={appt.id}
                            className="glass-panel p-6 flex justify-between items-center"
                        >
                            <div>
                                <p className="text-white font-semibold">
                                    {appt.service_name}
                                </p>
                                <p className="text-sm text-[var(--text-muted)]">
                                    Date: {appt.date}
                                </p>
                                <p className="text-sm text-[var(--text-muted)]">
                                    Provider: {appt.provider_name}
                                </p>
                            </div>

                            {/* STATUS BADGE */}
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold
                ${appt.status === "ACCEPTED"
                                        ? "bg-green-500/20 text-green-400"
                                        : appt.status === "REJECTED"
                                            ? "bg-red-500/20 text-red-400"
                                            : "bg-yellow-500/20 text-yellow-400"
                                    }`}
                            >
                                {appt.status}
                            </span>
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
