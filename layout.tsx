import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
    title: 'UrbanConnect | Find Trusted Local Pros',
    description: 'Connect with top-rated local service providers for home, wellness, and more.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main className="min-h-screen pt-24">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
