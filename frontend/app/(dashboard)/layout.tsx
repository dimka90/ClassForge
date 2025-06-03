import SideBar from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  );
}
