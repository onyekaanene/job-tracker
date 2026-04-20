"use client";

import { Menu, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type NavbarProps = {
  onMenuClick: () => void;
  title: string;
};

export default function Navbar({ onMenuClick, title }: NavbarProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-600 hover:text-gray-900"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
      >
        <LogOut size={16} />
        <span className="hidden md:inline">Logout</span>
      </button>
    </header>
  );
}
