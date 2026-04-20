"use client";

import { useApplicationStore } from "@/store/useApplicationStore";
import { ApplicationStatus } from "@/types";
import Link from "next/link";

const statusColors: Record<ApplicationStatus, string> = {
  wishlist: "bg-slate-100 text-slate-600",
  applied: "bg-blue-100 text-blue-600",
  interview: "bg-yellow-100 text-yellow-700",
  offer: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

export default function RecentApplications() {
  const applications = useApplicationStore((s) => s.applications);

  // Sort by most recently created, take top 5
  const recent = [...applications]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Recent Applications</h3>
        <Link
          href="/applications"
          className="text-sm text-blue-600 hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {recent.map((app) => (
          <div
            key={app.id}
            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {app.companyName}
              </p>
              <p className="text-xs text-gray-400">{app.role}</p>
            </div>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColors[app.status]}`}
            >
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
