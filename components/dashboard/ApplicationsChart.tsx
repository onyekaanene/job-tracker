"use client";

import { useApplicationStore } from "@/store/useApplicationStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ApplicationsChart() {
  const applications = useApplicationStore((s) => s.applications);

  const data = [
    {
      name: "Wishlist",
      count: applications.filter((a) => a.status === "wishlist").length,
      fill: "#94a3b8",
    },
    {
      name: "Applied",
      count: applications.filter((a) => a.status === "applied").length,
      fill: "#60a5fa",
    },
    {
      name: "Interview",
      count: applications.filter((a) => a.status === "interview").length,
      fill: "#fbbf24",
    },
    {
      name: "Offer",
      count: applications.filter((a) => a.status === "offer").length,
      fill: "#34d399",
    },
    {
      name: "Rejected",
      count: applications.filter((a) => a.status === "rejected").length,
      fill: "#f87171",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-1">
        Applications by Stage
      </h3>
      <p className="text-sm text-gray-400 mb-6">Your pipeline at a glance</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barSize={36}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              fontSize: "13px",
            }}
            cursor={{ fill: "#f8fafc" }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <rect key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
