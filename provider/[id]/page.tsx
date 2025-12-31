
import Link from 'next/link';

export default async function ProviderProfilePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    return (
        <div className="container py-12">
            <Link href="/services" className="text-sm text-[var(--text-muted)] hover:text-white mb-8 inline-block">&larr; Back to Services</Link>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Profile Info */}
                <div className="flex-1">
                    <div className="glass-panel p-8 mb-8">
                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                            <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-[var(--primary)] shrink-0"></div>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">John Doe {id}</h1>
                                <p className="text-[var(--primary)] font-medium mb-4">Master Plumber & Pipefitter</p>
                                <div className="flex gap-6 text-sm text-[var(--text-muted)] mb-6">
                                    <span className="flex items-center gap-1">📍 New York, NY</span>
                                    <span className="flex items-center gap-1">⭐ 4.9 (124 reviews)</span>
                                    <span className="flex items-center gap-1">💼 5+ Years Exp.</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['Pipe Repair', 'Installation', 'Maintenance', 'Emergency'].map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-[rgba(255,255,255,0.1)] text-xs text-white border border-[rgba(255,255,255,0.1)]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">About Me</h2>
                        <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                            I have been providing top-notch plumbing services for over 5 years. specialized in residential repairs and installations. My goal is to ensure your home systems are running smoothly and efficiently. valid license and insurance for your peace of mind.
                        </p>

                        <h3 className="text-xl font-bold text-white mb-4">Reviews</h3>
                        <div className="space-y-6">
                            {[1, 2].map(review => (
                                <div key={review} className="border-b border-[rgba(255,255,255,0.1)] pb-6 last:border-0">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold text-white">Alice Smith</span>
                                        <span className="text-sm text-[var(--text-muted)]">2 days ago</span>
                                    </div>
                                    <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
                                    <p className="text-[var(--text-muted)] text-sm">
                                        John was excellent! He arrived on time, fixed the leak quickly, and cleaned up afterwards. Highly recommended.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Booking Card */}
                <div className="w-full lg:w-96">
                    <div className="glass-panel p-6 sticky top-24">
                        <h3 className="text-xl font-bold text-white mb-6">Book Appointment</h3>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs text-[var(--text-muted)] mb-1 uppercase tracking-wider">Service Type</label>
                                <select className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--primary)]">
                                    <option>General Repair</option>
                                    <option>Installation</option>
                                    <option>Inspection</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-[var(--text-muted)] mb-1 uppercase tracking-wider">Date</label>
                                <input type="date" className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--primary)]" />
                            </div>

                            <div>
                                <label className="block text-xs text-[var(--text-muted)] mb-1 uppercase tracking-wider">Time</label>
                                <select className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--primary)]">
                                    <option>09:00 AM</option>
                                    <option>10:00 AM</option>
                                    <option>11:00 AM</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6 py-4 border-t border-b border-[rgba(255,255,255,0.1)]">
                            <span className="text-[var(--text-muted)]">Total Estimate</span>
                            <span className="text-2xl font-bold text-white">$80</span>
                        </div>

                        <button className="btn-primary w-full py-3 text-lg shadow-lg">Confirm Booking</button>
                        <p className="text-xs text-[var(--text-muted)] text-center mt-4">
                            You won't be charged yet.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
