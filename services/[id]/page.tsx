
import Link from 'next/link';

export default async function ServiceCategoryPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    // Clean up ID for display
    const title = id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' ');

    return (
        <div className="container py-12">
            <div className="mb-8">
                <Link href="/services" className="text-sm text-[var(--text-muted)] hover:text-white mb-4 inline-block">&larr; Back to Services</Link>
                <h1 className="text-3xl font-bold text-white mb-2">{title} Professionals</h1>
                <p className="text-[var(--text-muted)]">Select a professional to book your service.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Mock Provider List */}
                {[1, 2, 3].map((provider) => (
                    <div key={provider} className="glass-panel p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full bg-gray-700 shrink-0 border-2 border-[var(--primary)]"></div>

                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-white">John Doe {provider}</h3>
                                <span className="text-yellow-400 font-bold flex items-center gap-1">★ 4.{8 + provider} (12{provider} reviews)</span>
                            </div>
                            <p className="text-sm text-[var(--text-muted)] mb-4 w-full md:w-3/4">
                                Experienced {title.toLowerCase()} specialist with over 5 years of field work. Dedicated to providing high-quality service and customer satisfaction.
                            </p>

                            <div className="flex gap-4 text-sm text-[var(--text-muted)]">
                                <span className="flex items-center gap-1">Starting from <strong className="text-white">$40/hr</strong></span>
                                <span>•</span>
                                <span>50+ Jobs Completed</span>
                            </div>
                        </div>

                        <div className="w-full md:w-auto flex flex-col gap-2">
                            <button className="btn-primary w-full md:w-auto px-6">Book Now</button>
                            <button className="px-6 py-2 rounded-full border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.05)] text-sm">View Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
