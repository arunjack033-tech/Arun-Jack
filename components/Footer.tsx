import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full py-12 mt-20 border-t border-[rgba(255,255,255,0.05)] bg-[var(--surface)] text-[var(--text-muted)]">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">UrbanConnect</h3>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Connecting you with trusted local professionals for all your home and personal needs.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Discover</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-white transition-colors">Home Cleaning</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Plumbing</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Electrician</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Personal Training</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Join Our Newsletter</h4>
                    <div className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] focus:outline-none focus:border-[var(--primary)] text-white text-sm"
                        />
                        <button className="btn-primary py-2 text-sm w-full md:w-auto">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="container mt-12 pt-8 border-t border-[rgba(255,255,255,0.05)] text-center text-xs">
                &copy; {new Date().getFullYear()} UrbanConnect. All rights reserved.
            </div>
        </footer>
    );
}
