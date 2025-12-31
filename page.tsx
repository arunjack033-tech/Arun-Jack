import Link from 'next/link';
import { Sparkles, Zap, Wrench, Car, Leaf, ArrowRight, Star, Shield, Clock } from 'lucide-react';

export default function Home() {
    const services = [
        { name: 'Cleaning', icon: Sparkles, color: 'bg-blue-500', desc: 'Home & Office' },
        { name: 'Electrical', icon: Zap, color: 'bg-yellow-500', desc: 'Repairs & Install' },
        { name: 'Plumbing', icon: Wrench, color: 'bg-cyan-500', desc: 'Fixes & Leaks' },
        { name: 'Car Wash', icon: Car, color: 'bg-red-500', desc: 'Detailing & Wash' },
        { name: 'Gardening', icon: Leaf, color: 'bg-green-500', desc: 'Lawn & Care' },
    ];

    return (
        <div className="flex flex-col gap-24 pb-20">

            {/* Hero Section */}
            <section className="relative px-6 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)] rounded-full blur-[120px] opacity-20 -z-10 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-sm text-[var(--secondary)] mb-6 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--secondary)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--secondary)]"></span>
                        </span>
                        New Services Available
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Professional Services, <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Delivered Instantly.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10">
                        Book trusted professionals for cleaning, repairs, and maintenance. Experience the new standard in home care.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link href="/services" className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
                            Book a Service <ArrowRight size={20} />
                        </Link>
                        <Link href="/auth/signup" className="flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] transition-colors text-white backdrop-blur-sm">
                            Become a Provider
                        </Link>
                    </div>
                </div>
            </section>

            {/* Promotional Ad Banner */}
            <section className="container px-4">
                <div className="relative rounded-3xl overflow-hidden min-h-[300px] flex items-center relative group cursor-pointer">
                    {/* Placeholder for Ad Image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-80 z-0"></div>
                    <div className="absolute inset-0 bg-[url('/ad-pattern.svg')] opacity-10"></div> {/* Optional pattern */}

                    <div className="relative z-10 p-10 md:p-16 w-full md:w-2/3">
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold text-white mb-4 uppercase tracking-wider">
                            Special Offer
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Get 20% off your first <br /> Home Cleaning</h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-md">Use code <strong>URBAN20</strong> at checkout. Limited time offer for new customers.</p>
                        <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">
                            Claim Offer
                        </button>
                    </div>

                    {/* Decorative Image Placeholder Area */}
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-black/50 to-transparent z-0 hidden md:block">
                        {/* If images were available: <Image src="..." layout="fill" objectFit="cover" /> */}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="container px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Our Services</h2>
                        <p className="text-[var(--text-muted)]">Everything you need for your home and car.</p>
                    </div>
                    <Link href="/services" className="text-[var(--secondary)] font-medium hover:underline flex items-center gap-1">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {services.map((service, i) => (
                        <div key={i} className="glass-panel p-6 flex flex-col items-center text-center gap-4 hover:translate-y-[-5px] transition-all duration-300 cursor-pointer group border border-white/5 hover:border-[var(--primary)]/50">
                            <div className={`w-16 h-16 rounded-2xl ${service.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <service.icon className={`w-8 h-8 ${service.color.replace('bg-', 'text-')}`} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">{service.name}</h3>
                                <p className="text-xs text-[var(--text-muted)]">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trust/Value Proposition */}
            <section className="container px-4 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-[white]/5 border border-[white]/5 backdrop-blur-sm">
                        <Shield className="w-10 h-10 text-[var(--secondary)] mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Secure & Safe</h3>
                        <p className="text-[var(--text-muted)]">All providers are vigorously vetted and background checked for your safety.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-[white]/5 border border-[white]/5 backdrop-blur-sm">
                        <Star className="w-10 h-10 text-[var(--secondary)] mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Top Rated</h3>
                        <p className="text-[var(--text-muted)]">We only partner with the highest-rated professionals in your city.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-[white]/5 border border-[white]/5 backdrop-blur-sm">
                        <Clock className="w-10 h-10 text-[var(--secondary)] mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">On Demand</h3>
                        <p className="text-[var(--text-muted)]">Book a service for now or schedule it for later. You're in control.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}
