"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

function BookingContent() {
    const supabase = createClient();
    const params = useSearchParams();
    const router = useRouter();
    const serviceName = params.get("service");

    // State
    const [service, setService] = useState<any>(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch Service
    useEffect(() => {
        if (!serviceName) return;

        async function fetchService() {
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .eq("name", serviceName)
                .single();

            if (data) setService(data);
            if (error) console.error("Error fetching service:", error);
        }
        fetchService();
    }, [serviceName, supabase]);

    // Handle Confirm
    const confirmBooking = async () => {
        if (!date || !time) {
            setError("Please select both date and time.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const res = await fetch("/api/appointments/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    service_id: service.id,
                    provider_id: service.provider_id, // Ensure this exists in your services table
                    appointment_date: date,
                    appointment_time: time
                }),
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(result.error || "Booking failed");
            }

            // Success redirect
            router.push("/my-bookings");

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!serviceName) return <div className="text-white p-10">Invalid Service. <Link href="/services" className="text-blue-400">Go back</Link></div>;
    if (!service) return <div className="min-h-screen flex text-white justify-center items-center">Loading Service...</div>;

    return (
        <div className="min-h-screen text-white flex flex-col items-center pt-10 px-4">
            <div className="w-full max-w-lg glass-panel p-8">
                <h1 className="text-3xl font-bold mb-2 title-gradient">Confirm Booking</h1>
                <p className="text-gray-400 mb-6">Complete your reservation details below.</p>

                {/* Service Card */}
                <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5 mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{service.name}</h2>
                    <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                    <div className="text-xl font-bold text-blue-400">₹{service.price}</div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Select Date</label>
                        <input
                            type="date"
                            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]} // Disable past dates
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Select Time</label>
                        <input
                            type="time"
                            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>

                    {error && <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/30">{error}</div>}

                    <button
                        onClick={confirmBooking}
                        disabled={loading}
                        className={`w-full py-4 mt-4 rounded-full font-bold text-lg shadow-lg transition-all ${loading
                                ? "bg-slate-700 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-cyan-500/25 hover:-translate-y-1"
                            }`}
                    >
                        {loading ? "Confirming..." : "Confirm Booking"}
                    </button>

                    <button
                        onClick={() => router.back()}
                        className="w-full py-3 text-gray-500 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Booking() {
    return (
        <Suspense fallback={<div className="text-white p-10">Loading booking...</div>}>
            <BookingContent />
        </Suspense>
    );
}
