"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Booking() {
    const supabase = createClient();
    const params = useSearchParams();
    const router = useRouter();
    const serviceName = params.get("service");
    const [service, setService] = useState<any>(null);

    useEffect(() => {
        supabase.from("services").select("*").eq("name", serviceName).single()
            .then(res => setService(res.data));
    }, []);

    const confirm = async () => {
        await supabase.from("appointments").insert({
            service_id: service.id,
            status: "pending"
        });
        router.push("/my-bookings");
    };

    if (!service) return null;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Confirm {service.name}</h1>
            <p>{service.description}</p>
            <p className="mt-2 font-semibold">₹{service.price}</p>

            <button onClick={confirm} className="mt-6 px-6 py-3 bg-blue-600 rounded-xl">
                Confirm Booking
            </button>
        </div>
    );
}
