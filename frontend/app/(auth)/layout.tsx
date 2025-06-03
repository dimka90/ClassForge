import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[url('/images/bg-image.jpg')] h-screen bg-cover bg-no-repeat bg-black/70 bg-blend-overlay overflow-hidden">
      <div className="h-full w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 sm:px-6 lg:px-8 py-4">
        {/* Left Column - Branding (shared across auth pages) */}
        <div className="text-white flex flex-col justify-center items-center lg:items-start h-full">
          <div className="font-bold text-2xl sm:text-3xl mb-4 lg:mb-8">
            ClassForge
          </div>
          <div className="max-w-[400px] text-center lg:text-left">
            <h1 className="font-bold text-xl sm:text-2xl mb-2">
              Management Meets Excellence.
            </h1>
            <p className="font-light text-xs sm:text-sm">
              ClassForge simplifies student management by providing tools to
              create and manage timetables effortlessly. Empower your
              institution with seamless scheduling and organization.
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
