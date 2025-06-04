import SideBar from "@/components/SideBar";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 ml-64">
        <DashboardNavbar
          hasNotifications={true}
          profileImageUrl="/images/Profile.png"
          userName="John Doe"
        />
        <main className="p-8 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
