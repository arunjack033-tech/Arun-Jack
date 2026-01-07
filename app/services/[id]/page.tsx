"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ServiceCategoryPage() {
    const params = useParams();
    const id = params.id as string; // service_id (UUID)

    const supabase = createClient();

    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [providers, setProviders] = useState<any[]>([]);

    const title =
        id.charAt(0).toUpperCase() + id.slice(1).replace("-", " ");

    // 🔥 Load real providers for this service
    useEffect(() => {
        async function loadProviders() {
            const { data } = await supabase
                .from("providers")
                .select("id, name, experience")
                .eq("service_id", id);

            setProviders(data || []);
        }

        loadProviders();
    }, [id]);

    async function bookAppointment(provider_id: string) {
        setLoading(true);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            alert("Please login first");
            setLoading(false);
            return;
        }

        const res = await fetch("/api/appointments/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                service_id: id,
                provider_id,                 // REAL UUID
                appointment_date: date,
                appointment_time: "10:00 AM",
            }),
        });

        const data = await res.json();

        if (!data.success) {
            alert(`Booking Failed: ${data.error || "Unknown error"}`);
            setLoading(false);
            return;
        }

        setLoading(false);
        window.location.href = "/my-bookings";
    }

    return (
        <div className="container py-12">
            <div className="mb-8">
                <Link
                    href="/services"
                    className="text-sm text-[var(--text-muted)] hover:text-white mb-4 inline-block"
                >
                    &larr; Back to Services
                </Link>

                <h1 className="text-3xl font-bold text-white mb-2">{title} Professionals</h1>
                <p className="text-[var(--text-muted)]">Select a professional to book your service.</p>
            </div>

            <div className="mb-6 max-w-xs">
                <label className="text-sm text-[var(--text-muted)] mb-1 block">
                    Select Date
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded px-4 py-2 text-white"
                />
            </div>

            <div className="grid grid-cols-1 gap-6">
                {providers.map((p) => (
                    <div
                        key={p.id}
                        className="glass-panel p-6 flex flex-col md:flex-row gap-6 items-start md:items-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-gray-700 shrink-0 border-2 border-[var(--primary)]"></div>

                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white">{p.name}</h3>
                            <p className="text-sm text-[var(--text-muted)] mb-4">
                                {p.experience}+ years experience
                            </p>
                        </div>

                        <button
                            disabled={!date || loading}
                            onClick={() => bookAppointment(p.id)}   // REAL UUID
                            className="btn-primary w-full md:w-auto px-6"
                        >
                            {loading ? "Booking..." : "Book Now"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
