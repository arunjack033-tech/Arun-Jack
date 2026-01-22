import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyBookings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Try to fetch with join first
  const { data: bookings, error } = await supabase
    .from("appointments")
    .select(`
            *,
            services (
                name,
                price,
                description
            )
        `)
    .eq("user_id", user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching bookings:", error);
  }

  return (
    <div className="min-h-screen container mx-auto text-white pb-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold title-gradient mb-2">My Bookings</h1>
          <p className="text-gray-400">View and manage your scheduled services</p>
        </div>
        <Link href="/services" className="btn-primary">
          + Book New Service
        </Link>
      </div>

      {/* Booking List */}
      {!bookings || bookings.length === 0 ? (
        <div className="glass-panel p-10 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-2xl font-bold mb-2">No bookings yet</h2>
          <p className="text-gray-400 mb-6">You haven't booked any services yet. Explore our professional services.</p>
          <Link href="/services" className="btn-secondary">Explore Services</Link>
        </div>
      ) : (
        <div className="auto-grid">
          {bookings.map((booking: any) => {
            // Fallback logic for service name
            const serviceName = booking.services?.name || booking.service_name || "Unknown Service";
            const price = booking.services?.price ? `₹${booking.services.price}` : "";

            // Status Colors
            const statusColors: any = {
              PENDING: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
              CONFIRMED: "bg-blue-500/20 text-blue-500 border-blue-500/30",
              COMPLETED: "bg-green-500/20 text-green-500 border-green-500/30",
              CANCELLED: "bg-red-500/20 text-red-500 border-red-500/30"
            };
            const statusStyle = statusColors[booking.status] || "bg-gray-800 text-gray-400";

            return (
              <div key={booking.id} className="card bg-slate-900/50 border border-white/5 hover:border-blue-500/30 group relative overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="w-24 h-24 bg-blue-500 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {serviceName}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">ID: {booking.id.slice(0, 8)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyle}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <span className="w-6 opacity-60">📅</span>
                    <span>{booking.appointment_date || booking.date}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="w-6 opacity-60">⏰</span>
                    <span>{booking.appointment_time || "Time not set"}</span>
                  </div>
                  {price && (
                    <div className="flex items-center text-gray-300">
                      <span className="w-6 opacity-60">💰</span>
                      <span>{price}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/5 flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors">
                    Details
                  </button>
                  {booking.status === 'PENDING' && (
                    <button className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm transition-colors">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
