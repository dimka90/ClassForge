"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SideBar;
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
function SideBar() {
    const pathname = (0, navigation_1.usePathname)();
    const [isCoursesOpen, setIsCoursesOpen] = (0, react_1.useState)(pathname.startsWith("/courses"));
    const navItems = [
        { href: "/home", label: "Dashboard", icon: lucide_react_1.Home },
        {
            href: "/courses",
            label: "Courses",
            icon: lucide_react_1.NotebookText,
            subItems: [
                { href: "/courses/view-course", label: "View Courses" },
                { href: "/courses/manage", label: "Manage Courses" },
            ],
        },
        { href: "/add-invigilator", label: "Add Invigilator", icon: lucide_react_1.FilePenLine },
        { href: "/exam-halls", label: "Exam Halls", icon: lucide_react_1.MapPin },
        { href: "/time-table", label: "Time Table", icon: lucide_react_1.Eye },
        { href: "/dashboard/settings", label: "Settings", icon: lucide_react_1.Settings },
    ];
    const isActiveLink = (href) => {
        if (href === "/dashboard") {
            return pathname === "/dashboard";
        }
        return pathname.startsWith(href);
    };
    const toggleCoursesDropdown = () => {
        setIsCoursesOpen(!isCoursesOpen);
    };
    return (<aside className="w-64 h-screen bg-[#212121] text-white fixed left-0 top-0 border-r border-gray-300 flex flex-col">
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
            return (<div key={item.href}>
                <div onClick={item.subItems ? toggleCoursesDropdown : undefined} className={`
                    flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer
                    ${isActive
                    ? "bg-white text-black shadow-md"
                    : "text-slate-300 hover:text-white hover:bg-gray-500"}
                  `}>
                  <link_1.default href={!item.subItems ? item.href : "#"} className="flex items-center flex-1">
                    <Icon className={`mr-3 h-5 w-5 transition-colors ${isActive
                    ? "text-[#212121]"
                    : "text-slate-400 group-hover:text-white"}`}/>
                    <span>{item.label}</span>
                  </link_1.default>
                  {item.subItems &&
                    (isCoursesOpen ? (<lucide_react_1.ChevronUp className="h-4 w-4"/>) : (<lucide_react_1.ChevronDown className="h-4 w-4"/>))}
                </div>

                {/* Sub-items with Framer Motion animation */}
                {item.subItems && (<framer_motion_1.AnimatePresence>
                    {isCoursesOpen && (<framer_motion_1.motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="ml-8 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (<link_1.default key={subItem.href} href={subItem.href} className={`
                                flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                ${isActiveLink(subItem.href)
                                ? "bg-gray-700 text-white"
                                : "text-slate-300 hover:text-white hover:bg-gray-600"}
                              `}>
                              <span>{subItem.label}</span>
                            </link_1.default>))}
                        </div>
                      </framer_motion_1.motion.div>)}
                  </framer_motion_1.AnimatePresence>)}
              </div>);
        })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="p-4">
        <link_1.default href="/" className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-gray-500 transition-all duration-200 group">
          <lucide_react_1.ArrowLeft className="mr-3 h-5 w-5 text-slate-400 group-hover:text-white transition-colors"/>
          <span>Log Out</span>
        </link_1.default>
      </div>
    </aside>);
}
