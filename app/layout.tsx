import "./globals.css";
import PremiumShell from "@/components/PremiumShell";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <PremiumShell>{children}</PremiumShell>
            </body>
        </html>
    );
}
