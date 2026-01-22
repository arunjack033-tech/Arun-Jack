import DashboardHeader from "./DashboardHeader";

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#05070d] text-white">
            <DashboardHeader />

            {/* Page Content */}
            <main className="mx-auto max-w-7xl px-6 py-12">
                {children}
            </main>
        </div>
    );
}
