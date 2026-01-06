import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4">
      <div className="container mx-auto px-6">
        <div className="glass-panel px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              UrbanConnect
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-200">
            <Link href="/services" className="hover:text-white transition-colors">Find Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Join as Pro</Link>
            <Link href="#" className="hover:text-white transition-colors">How it Works</Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/auth?mode=login" className="px-5 py-2 rounded-full text-sm font-medium text-white border border-white/10 hover:bg-white/10 transition-all">
              Log In
            </Link>
            <Link href="/auth?mode=signup" className="btn-primary text-sm px-5 py-2">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
