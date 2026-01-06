"use client";

import Link from 'next/link';

const services = [
    {
        id: 'cleaning',
        title: 'Home Cleaning',
        description: 'Professional cleaning for homes and offices.',
        iconColor: 'bg-blue-500',
        count: 120
    },
    {
        id: 'plumbing',
        title: 'Plumbing',
        description: 'Expert plumbers for repairs and installations.',
        iconColor: 'bg-cyan-500',
        count: 45
    },
    {
        id: 'electrician',
        title: 'Electrician',
        description: 'Certified electricians for all electrical needs.',
        iconColor: 'bg-yellow-500',
        count: 38
    },
    {
        id: 'moving',
        title: 'Movers & Packers',
        description: 'Hassle-free shifting services.',
        iconColor: 'bg-orange-500',
        count: 24
    },
    {
        id: 'painting',
        title: 'Painting',
        description: 'Interior and exterior painting services.',
        iconColor: 'bg-purple-500',
        count: 56
    },
    {
        id: 'pest-control',
        title: 'Pest Control',
        description: 'Safe and effective pest removal.',
        iconColor: 'bg-red-500',
        count: 18
    },
];

export default function ServicesPage() {
    return (
        <div className="container py-12">

            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold text-white mb-4">Find the Perfect Service</h1>
                <p className="text-[var(--text-muted)] text-lg">
                    Browse our wide range of services and find trusted professionals for your specific needs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <Link href={`/services/${service.id}`} key={service.id} className="glass-panel p-6 flex flex-col gap-4 hover:bg-[rgba(255,255,255,0.03)] transition-all hover:-translate-y-1">
                        <div className={`w-12 h-12 rounded-lg ${service.iconColor} bg-opacity-20 flex items-center justify-center text-white`}>
                            {/* Icon Placeholder */}
                            <div className={`w-6 h-6 rounded-full bg-current opacity-60`}></div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                            <p className="text-sm text-[var(--text-muted)] mb-3">{service.description}</p>
                            <span className="text-xs font-medium text-[var(--secondary)] bg-[rgba(var(--secondary-h),var(--secondary-s),var(--secondary-l),0.1)] px-2 py-1 rounded-full">
                                {service.count} Pros Available
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}
