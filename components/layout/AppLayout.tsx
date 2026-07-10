"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { useApplicationStore } from "@/store/useApplicationStore";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/applications": "Applications",
  "/settings": "Settings",
};

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = pageTitles[pathname] || "JobTracker";
  const loadApplications = useApplicationStore((s) => s.loadApplications);

  // Load data once when layout mounts — covers all pages
  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
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
