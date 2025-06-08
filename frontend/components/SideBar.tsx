"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ArrowLeft,
  NotebookText,
  ChevronDown,
  ChevronUp,
  Eye,
  FilePenLine,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SideBar() {
  const pathname = usePathname();
  const [isCoursesOpen, setIsCoursesOpen] = useState(
    pathname.startsWith("/courses")
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const navItems = [
    { href: "/home", label: "Dashboard", icon: Home },
    {
      href: "/courses",
      label: "Courses",
      icon: NotebookText,
      subItems: [
        { href: "/courses/view-course", label: "View Courses" },
        { href: "/courses/manage", label: "Manage Courses" },
      ],
    },
    { href: "/add-invigilator", label: "Add Invigilator", icon: FilePenLine },
    { href: "/exam-halls", label: "Exam Halls", icon: MapPin },
    { href: "/time-table", label: "Time Table", icon: Eye },
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

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        onClick={toggleMobileMenu}
        className="fixed z-30 md:hidden top-4 left-4 p-2 rounded-lg bg-[#212121] text-white"
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobile ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isMobile ? (isMobileOpen ? "16rem" : "0rem") : "16rem",
          opacity: isMobile ? (isMobileOpen ? 1 : 0) : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`h-screen bg-[#212121] text-white fixed left-0 top-0 border-r border-gray-300 flex flex-col z-20 overflow-hidden ${
          isMobile ? "w-0" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-start px-6">
          <h1 className="text-xl font-semibold text-white">ClassForge</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveLink(item.href);

              return (
                <div key={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                    {item.subItems &&
                      (isCoursesOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </motion.div>

                  {/* Sub-items with Framer Motion animation */}
                  {item.subItems && (
                    <AnimatePresence>
                      {isCoursesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-8 mt-1 space-y-1">
                            {item.subItems.map((subItem) => (
                              <motion.div
                                key={subItem.href}
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <Link
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
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="p-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/"
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-gray-500 transition-all duration-200 group"
            >
              <ArrowLeft className="mr-3 h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
              <span>Log Out</span>
            </Link>
          </motion.div>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
            className="fixed inset-0 z-10 bg-black md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
