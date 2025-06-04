'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Bell, 
  MessageCircle, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface DashboardNavbarProps {
  hasNotifications?: boolean;
  profileImageUrl?: string;
  userName?: string;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  hasNotifications = true,
  profileImageUrl = "/images/Profile.png",
  userName = "User"
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    console.log('Search query:', value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
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

  const NavButton: React.FC<{
    onClick?: () => void;
    children: React.ReactNode;
    hasNotification?: boolean;
    className?: string;
  }> = ({ onClick, children, hasNotification, className = '' }) => (
    <button
      onClick={onClick}
      className={`relative p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 ${className}`}
    >
      {children}
      {hasNotification && (
        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      )}
    </button>
  );

  return (
    <>
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <NavButton onClick={handleBack} className="hidden sm:flex">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </NavButton>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <div className="hidden sm:block flex-1 max-w-md">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#212121] focus:border-transparent focus:bg-white transition-all duration-200"
                  />
                </form>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-3">
              <NavButton 
                onClick={handleNotificationClick} 
                hasNotification={hasNotifications}
              >
                <Bell className="w-5 h-5 text-gray-600" />
              </NavButton>
              <NavButton onClick={handleMessageClick}>
                <MessageCircle className="w-5 h-5 text-gray-600" />
              </NavButton>
              <NavButton onClick={handleSettingsClick}>
                <Settings className="w-5 h-5 text-gray-600" />
              </NavButton>
              <button
                onClick={handleProfileClick}
                className="relative w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all duration-200"
              >
                <Image
                  src={profileImageUrl}
                  alt={userName}
                  width={50}
                  height={50}
                  className="object-cover"
                  sizes="32px"
                />
              </button>
            </div>
            <div className="sm:hidden">
              <button
                onClick={handleProfileClick}
                className="relative w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all duration-200"
              >
                <Image
                  src={profileImageUrl}
                  alt={userName}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#212121] focus:border-transparent focus:bg-white transition-all duration-200"
                />
              </form>
              <div className="flex items-center justify-between pt-2">
                <NavButton onClick={handleBack}>
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </NavButton>
                <div className="flex items-center space-x-4">
                  <NavButton 
                    onClick={handleNotificationClick} 
                    hasNotification={hasNotifications}
                  >
                    <Bell className="w-5 h-5 text-gray-600" />
                  </NavButton>
                  <NavButton onClick={handleMessageClick}>
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                  </NavButton>
                  <NavButton onClick={handleSettingsClick}>
                    <Settings className="w-5 h-5 text-gray-600" />
                  </NavButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default DashboardNavbar;
