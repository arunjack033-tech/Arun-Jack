"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ServiceCategoryPage() {
    const params = useParams();
    const id = params.id as string;

    const supabase = createClient();

    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);

    const title =
        id.charAt(0).toUpperCase() + id.slice(1).replace("-", " ");

    async function bookAppointment(providerId: string) {
        setLoading(true);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            alert("Please login first");
            setLoading(false);
            return;
        }

        await fetch("/api/appointments/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user.id,
                user_name: user.user_metadata.full_name,
                user_email: user.email,
                provider_id: providerId,
                provider_name: "John Doe",
                service_name: title,
                date,
            }),
        });

        alert("Appointment requested successfully!");
        setLoading(false);
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

                <h1 className="text-3xl font-bold text-white mb-2">
                    {title} Professionals
                </h1>
                <p className="text-[var(--text-muted)]">
                    Select a professional to book your service.
                </p>
            </div>

            {/* DATE PICKER */}
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
                {[1, 2, 3].map((provider) => (
                    <div
                        key={provider}
                        className="glass-panel p-6 flex flex-col md:flex-row gap-6 items-start md:items-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-gray-700 shrink-0 border-2 border-[var(--primary)]"></div>

                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white">
                                John Doe {provider}
                            </h3>
                            <p className="text-sm text-[var(--text-muted)] mb-4">
                                Experienced {title.toLowerCase()} specialist with 5+ years
                                experience.
                            </p>
                        </div>

                        <div className="w-full md:w-auto flex flex-col gap-2">
                            <button
                                disabled={!date || loading}
                                onClick={() => bookAppointment(`provider-${provider}`)}
                                className="btn-primary w-full md:w-auto px-6"
                            >
                                {loading ? "Booking..." : "Book Now"}
                            </button>

                            <button className="px-6 py-2 rounded-full border border-white/10 text-white text-sm">
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
