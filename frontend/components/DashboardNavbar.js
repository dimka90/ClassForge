"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const navigation_1 = require("next/navigation");
const DashboardNavbar = ({ hasNotifications = true, profileImageUrl = "/images/Profile.png", userName = "User" }) => {
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, react_1.useState)(false);
    const router = (0, navigation_1.useRouter)();
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        console.log('Search query:', value);
    };
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Search submitted:', searchQuery);
    };
    const handleBack = () => {
        router.back();
    };
    const handleNotificationClick = () => {
        console.log('Notifications clicked');
    };
    const handleMessageClick = () => {
        console.log('Messages clicked');
    };
    const handleSettingsClick = () => {
        console.log('Settings clicked');
    };
    const handleProfileClick = () => {
        console.log('Profile clicked');
    };
    const NavButton = ({ onClick, children, hasNotification, className = '' }) => (<button onClick={onClick} className={`relative p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 ${className}`}>
      {children}
      {hasNotification && (<div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"/>)}
    </button>);
    return (<>
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <NavButton onClick={handleBack} className="hidden sm:flex">
                <lucide_react_1.ArrowLeft className="w-5 h-5 text-gray-600"/>
              </NavButton>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                {isMobileMenuOpen ? (<lucide_react_1.X className="w-5 h-5 text-gray-600"/>) : (<lucide_react_1.Menu className="w-5 h-5 text-gray-600"/>)}
              </button>
              <div className="hidden sm:block flex-1 max-w-md">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <lucide_react_1.Search className="w-4 h-4 text-gray-400"/>
                  </div>
                  <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#212121] focus:border-transparent focus:bg-white transition-all duration-200"/>
                </form>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-3">
              <NavButton onClick={handleNotificationClick} hasNotification={hasNotifications}>
                <lucide_react_1.Bell className="w-5 h-5 text-gray-600"/>
              </NavButton>
              <NavButton onClick={handleMessageClick}>
                <lucide_react_1.MessageCircle className="w-5 h-5 text-gray-600"/>
              </NavButton>
              <NavButton onClick={handleSettingsClick}>
                <lucide_react_1.Settings className="w-5 h-5 text-gray-600"/>
              </NavButton>
              <button onClick={handleProfileClick} className="relative w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all duration-200">
                <image_1.default src={profileImageUrl} alt={userName} width={50} height={50} className="object-cover" sizes="32px"/>
              </button>
            </div>
            <div className="sm:hidden">
              <button onClick={handleProfileClick} className="relative w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all duration-200">
                <image_1.default src={profileImageUrl} alt={userName} fill className="object-cover" sizes="32px"/>
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (<div className="sm:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <lucide_react_1.Search className="w-4 h-4 text-gray-400"/>
                </div>
                <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#212121] focus:border-transparent focus:bg-white transition-all duration-200"/>
              </form>
              <div className="flex items-center justify-between pt-2">
                <NavButton onClick={handleBack}>
                  <lucide_react_1.ArrowLeft className="w-5 h-5 text-gray-600"/>
                </NavButton>
                <div className="flex items-center space-x-4">
                  <NavButton onClick={handleNotificationClick} hasNotification={hasNotifications}>
                    <lucide_react_1.Bell className="w-5 h-5 text-gray-600"/>
                  </NavButton>
                  <NavButton onClick={handleMessageClick}>
                    <lucide_react_1.MessageCircle className="w-5 h-5 text-gray-600"/>
                  </NavButton>
                  <NavButton onClick={handleSettingsClick}>
                    <lucide_react_1.Settings className="w-5 h-5 text-gray-600"/>
                  </NavButton>
                </div>
              </div>
            </div>
          </div>)}
      </nav>
    </>);
};
exports.default = DashboardNavbar;
