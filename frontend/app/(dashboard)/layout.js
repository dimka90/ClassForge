"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLayout;
const SideBar_1 = __importDefault(require("@/components/SideBar"));
const DashboardNavbar_1 = __importDefault(require("@/components/DashboardNavbar"));
function DashboardLayout({ children, }) {
    return (<div className="flex">
      <SideBar_1.default />
      <div className="flex-1 ml-64">
        <DashboardNavbar_1.default hasNotifications={true} profileImageUrl="/images/Profile.png" userName="John Doe"/>
        <main className="p-8 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </div>);
}
