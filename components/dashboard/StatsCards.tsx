"use client";

import { useApplicationStore } from "@/store/useApplicationStore";
import { Briefcase, Send, MessageSquare, Trophy } from "lucide-react";

export default function StatsCards() {
  const applications = useApplicationStore((s) => s.applications);

  const stats = [
    {
      label: "Total Tracked",
      value: applications.length,
      icon: Briefcase,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Applied",
      value: applications.filter((a) => a.status === "applied").length,
      icon: Send,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Interviewing",
      value: applications.filter((a) => a.status === "interview").length,
      icon: MessageSquare,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Offers",
      value: applications.filter((a) => a.status === "offer").length,
      icon: Trophy,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <div
          key={label}
          className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4"
        >
          <div className={`${bg} ${color} p-3 rounded-xl`}>
            <Icon size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
