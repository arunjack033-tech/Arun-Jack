import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ProviderProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    // ✅ FETCH APPOINTMENTS FOR THIS PROVIDER
    const { data: appointments, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("provider_id", id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
    }

    return (
        <div className="container py-12">
            <Link
                href="/services"
                className="text-sm text-[var(--text-muted)] hover:text-white mb-8 inline-block"
            >
                &larr; Back to Services
            </Link>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT COLUMN */}
                <div className="flex-1">
                    <div className="glass-panel p-8 mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Provider ID: {id}
                        </h1>
                        <p className="text-[var(--text-muted)]">
                            Total Appointments: {appointments?.length || 0}
                        </p>
                    </div>

                    {/* ✅ APPOINTMENTS LIST */}
                    <div className="glass-panel p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Recent Appointments
                        </h2>

                        {appointments && appointments.length > 0 ? (
                            <div className="space-y-4">
                                {appointments.map((appt: any) => (
                                    <div
                                        key={appt.id}
                                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                                    >
                                        <p className="text-white font-semibold">
                                            Customer: {appt.user_name}
                                        </p>
                                        <p className="text-sm text-[var(--text-muted)]">
                                            Date: {appt.date}
                                        </p>
                                        <p className="text-sm text-[var(--text-muted)]">
                                            Status:{" "}
                                            <span className="text-[var(--primary)]">
                                                {appt.status}
                                            </span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-[var(--text-muted)]">
                                No appointments found
                            </p>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="w-full lg:w-96">
                    <div className="glass-panel p-6 sticky top-24">
                        <h3 className="text-xl font-bold text-white mb-6">
                            Book Appointment
                        </h3>

                        <button className="btn-primary w-full py-3 text-lg shadow-lg">
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
