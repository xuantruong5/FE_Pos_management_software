import AdminHearder from "@/components/admin/admin.hearder";
import AdminSidebar from "@/components/admin/admin.sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">

            <AdminHearder />

            <AdminSidebar />

            <main className="min-h-screen bg-[#f3f4f6]">
                {children}
            </main>

        </div>
    );
}