'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, Settings, ArrowLeft } from "lucide-react";

export default function SideBar() {
  const pathname = usePathname();
  const navItems = [
    { href: "/home", label: "Dashboard", icon: Home },
    { href: "/add-course", label: "Add Course", icon: BarChart3 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    // Add more items as needed
  ];

  const isActiveLink = (href:string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 h-screen bg-[#212121] text-white fixed left-0 top-0 border-r border-gray-300 flex flex-col">
      {/* Header */}
      <div className="h-16 flex items-center justify-start px-6 border-b border-gray-500">
        <h1 className="text-xl font-semibold text-white">ClassForge</h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveLink(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-white text-black shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-gray-500"
                  }
                `}
              >
                <Icon 
                  className={`mr-3 h-5 w-5 transition-colors ${
                    isActive 
                      ? "text-white" 
                      : "text-slate-400 group-hover:text-white"
                  }`} 
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-500">
        <Link
          href="/"
          className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-gray-500 transition-all duration-200 group"
        >
          <ArrowLeft className="mr-3 h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
          <span>Log Out</span>
        </Link>
      </div>
    </aside>
  );
}