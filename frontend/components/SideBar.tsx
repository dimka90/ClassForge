'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, ArrowLeft, NotebookText, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function SideBar() {
  const pathname = usePathname();
  const [isCoursesOpen, setIsCoursesOpen] = useState(pathname.startsWith("/courses"));
  
  const navItems = [
    { href: "/home", label: "Dashboard", icon: Home },
    { 
      href: "/courses", 
      label: "Courses", 
      icon: NotebookText,
      subItems: [
        { href: "/courses/view-course", label: "View Courses" },
        { href: "/courses/manage", label: "Manage Courses" },
      ]
    },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const toggleCoursesDropdown = () => {
    setIsCoursesOpen(!isCoursesOpen);
  };

  return (
    <aside className="w-64 h-screen bg-[#212121] text-white fixed left-0 top-0 border-r border-gray-300 flex flex-col">
      {/* Header */}
      <div className="h-16 flex items-center justify-start px-6 ">
        <h1 className="text-xl font-semibold text-white">ClassForge</h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveLink(item.href);
            
            return (
              <div key={item.href}>
                <div
                  onClick={item.subItems ? toggleCoursesDropdown : undefined}
                  className={`
                    flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer
                    ${
                      isActive
                        ? "bg-white text-black shadow-md"
                        : "text-slate-300 hover:text-white hover:bg-gray-500"
                    }
                  `}
                >
                  <Link
                    href={!item.subItems ? item.href : "#"}
                    className="flex items-center flex-1"
                  >
                    <Icon 
                      className={`mr-3 h-5 w-5 transition-colors ${
                        isActive 
                          ? "text-[#212121]" 
                          : "text-slate-400 group-hover:text-white"
                      }`} 
                    />
                    <span>{item.label}</span>
                  </Link>
                  {item.subItems && (
                    isCoursesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
                
                {/* Sub-items */}
                {item.subItems && isCoursesOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`
                          flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            isActiveLink(subItem.href)
                              ? "bg-gray-700 text-white"
                              : "text-slate-300 hover:text-white hover:bg-gray-600"
                          }
                        `}
                      >
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="p-4">
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