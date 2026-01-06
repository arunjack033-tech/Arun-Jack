import Link from "next/link";
import {
    Sparkles,
    Zap,
    Wrench,
    Car,
    Leaf,
    ArrowRight,
    Star,
    Shield,
    Clock,
    LogIn,
} from "lucide-react";

export default function Home() {
    const services = [
        { name: "Cleaning", icon: Sparkles, color: "bg-blue-500", desc: "Home & Office" },
        { name: "Electrical", icon: Zap, color: "bg-yellow-500", desc: "Repairs & Install" },
        { name: "Plumbing", icon: Wrench, color: "bg-cyan-500", desc: "Fixes & Leaks" },
        { name: "Car Wash", icon: Car, color: "bg-red-500", desc: "Detailing & Wash" },
        { name: "Gardening", icon: Leaf, color: "bg-green-500", desc: "Lawn & Care" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#0b0f1a] text-white">



            {/* 🔹 HERO SECTION */}
            <section className="relative px-6 py-28 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-black -z-10"></div>

                <h2 className="text-5xl md:text-7xl font-extrabold mb-6">
                    Professional Services <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                        At Your Doorstep
                    </span>
                </h2>

                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
                    Book trusted professionals for cleaning, plumbing, electrical work and more.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/services"
                        className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl
                       bg-[var(--primary)] hover:bg-opacity-90 transition-all"
                    >
                        Book a Service <ArrowRight size={20} />
                    </Link>

                    <Link
                        href="/dashboard"
                        className="px-8 py-4 rounded-xl border border-white/20
                       hover:bg-white/10 transition-all"
                    >
                        View Dashboard
                    </Link>
                </div>
            </section>

            {/* 🔹 SERVICES */}
            <section className="container mx-auto px-6 py-20">
                <h3 className="text-3xl font-bold mb-10 text-center">Our Services</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10
                         hover:border-[var(--primary)] hover:-translate-y-1
                         transition-all text-center"
                        >
                            <div
                                className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${service.color} bg-opacity-20 flex items-center justify-center`}
                            >
                                <service.icon className="w-8 h-8" />
                            </div>

                            <h4 className="font-semibold">{service.name}</h4>
                            <p className="text-sm text-gray-400">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🔹 TRUST SECTION */}
            <section className="container mx-auto px-6 pb-20">
                <div className="grid md:grid-cols-3 gap-8">
                    <TrustCard
                        icon={<Shield />}
                        title="Secure & Verified"
                        text="All professionals are background verified."
                    />
                    <TrustCard
                        icon={<Star />}
                        title="Top Rated"
                        text="Only best-rated service providers."
                    />
                    <TrustCard
                        icon={<Clock />}
                        title="On Time Service"
                        text="Punctual & reliable appointments."
                    />
                </div>
            </section>

            {/* 🔹 FOOTER */}
            <footer className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} UrbanConnect. All rights reserved.
            </footer>
        </div>
    );
}

/* 🔹 TRUST CARD COMPONENT */
function TrustCard({ icon, title, text }) {
    return (
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="w-12 h-12 mx-auto mb-4 text-[var(--secondary)]">
                {icon}
            </div>
            <h4 className="text-xl font-semibold mb-2">{title}</h4>
            <p className="text-gray-400">{text}</p>
        </div>
    );
}
