import { createClient } from "@/utils/supabase/server";

export default async function MyBookings() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: bookings } = await supabase.from("appointments").select("*, services(*)");

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

            {bookings?.map(b => (
                <div key={b.id} className="p-6 mb-4 rounded-xl bg-slate-900">
                    <h2 className="text-xl">{b.services.name}</h2>
                    <p>Status: {b.status}</p>
                </div>
            ))}
        </div>
    );
}
