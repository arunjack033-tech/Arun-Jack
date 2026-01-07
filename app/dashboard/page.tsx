import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#0b0f1a] text-white p-10">
            <h1 className="text-3xl font-bold mb-8 text-purple-400">Dashboard</h1>

            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/dashboard/customer" className="p-6 bg-slate-900 rounded-xl hover:ring-2 ring-purple-500">
                    <h2 className="text-xl font-semibold mb-2">Customer Dashboard</h2>
                    <p>Book and manage services</p>
                </Link>

                <Link href="/dashboard/provider" className="p-6 bg-slate-900 rounded-xl hover:ring-2 ring-cyan-400">
                    <h2 className="text-xl font-semibold mb-2">Provider Dashboard</h2>
                    <p>Manage jobs and earnings</p>
                </Link>
            </div>
        </div>
    );
}
