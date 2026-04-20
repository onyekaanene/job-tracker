"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

// Map routes to page titles
const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/applications": "Applications",
  "/settings": "Settings",
};

type AppLayoutProps = {
  children: React.ReactNode; // the page content goes here
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = pageTitles[pathname] || "JobTracker";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
          {/* Credit */}
          <p className="text-xs text-gray-400 text-center mt-10 pb-2">
            Designed & developed by{" "}
            <span className="text-gray-500 font-medium">
              Onyekachukwu Anene
            </span>
          </p>
        </main>
      </div>
    </div>
  );
}
