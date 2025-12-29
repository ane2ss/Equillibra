import { DashboardNavbar } from "@/components/dashboard-navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function RolesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-background font-sans transition-colors duration-300 overflow-hidden">
            <DashboardSidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <DashboardNavbar />

                <main className="flex-1 p-6 space-y-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
