import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const supabase = await createClient();
    const body = await req.json();

    const {
        service_id,
        appointment_date,
        appointment_time,
    } = body;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔥 GET REAL PROVIDER UUID FROM services TABLE
    const { data: service, error: serviceError } = await supabase
        .from("services")
        .select("provider_id")
        .eq("id", service_id)
        .single();

    if (serviceError || !service) {
        return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // 🔥 INSERT WITH REAL UUID
    const { error } = await supabase.from("appointments").insert({
        user_id: user.id,               // auth.users UUID
        service_id,                     // services.id UUID
        provider_id: service.provider_id, // ✅ REAL UUID
        appointment_date,
        appointment_time,
        status: "PENDING",
    });

    if (error) {
        console.error(error);
        return NextResponse.json({ error: "Booking Failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
