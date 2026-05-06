"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, Settings, X } from "lucide-react";

// These are our navigation links
const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/applications", label: "Applications", icon: Briefcase },
  { href: "/settings", label: "Settings", icon: Settings },
];

// This component accepts a prop to know if it's open on mobile
type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname(); // tells us which page we're currently on

  return (
    <>
      {/* Dark overlay on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* The actual sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto
        `}
      >
        {/* Logo / App Name */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Briefcase className="text-blue-600" size={22} />
            <span className="font-bold text-gray-900 text-lg">JobTracker</span>
          </div>
          {/* Close button — only visible on mobile */}
          <button onClick={onClose} className="md:hidden text-gray-500">
            <X size={20} />
          </button>
        </div>
        

        {/* Navigation Links */}
        <nav className="p-4 flex flex-col gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-colors duration-150
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
