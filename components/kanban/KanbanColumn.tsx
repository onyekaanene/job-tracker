"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Application, ApplicationStatus } from "@/types";
import JobCard from "./JobCard";
import { Plus } from "lucide-react";

// Visual config for each column
const columnConfig: Record < ApplicationStatus, { label: string; color: string; dot: string } > = {
  wishlist: { label: "Wishlist", color: "bg-slate-100", dot: "bg-slate-400" },
  applied: { label: "Applied", color: "bg-blue-50", dot: "bg-blue-400" },
  interview: {label: "Interview", color: "bg-yellow-50", dot: "bg-yellow-400" },
  offer: { label: "Offer", color: "bg-green-50", dot: "bg-green-400" },
  rejected: { label: "Rejected", color: "bg-red-50", dot: "bg-red-400" },
};

type KanbanColumnProps = {
  status: ApplicationStatus;
  applications: Application[];
  onAddClick: () => void;
};

export default function KanbanColumn({
  status,
  applications,
  onAddClick,
}: KanbanColumnProps) {
  const config = columnConfig[status];

  return (
    <div
      className={`rounded-2xl ${config.color} p-4 min-w-[260px] w-[260px] flex-shrink-0`}
    >
      {/* Column header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${config.dot}`} />
          <span className="font-semibold text-gray-700 text-sm">
            {config.label}
          </span>
          <span className="text-xs text-gray-400 bg-white rounded-full px-2 py-0.5">
            {applications.length}
          </span>
        </div>
        <button
          onClick={onAddClick}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Droppable area — where cards can be dropped */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              min-h-[200px] rounded-xl transition-colors duration-200
              ${snapshot.isDraggingOver ? "bg-white/60" : ""}
            `}
          >
            {applications.map((app, index) => (
              <JobCard key={app.id} application={app} index={index} />
            ))}
            {provided.placeholder}
            {applications.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-col items-center justify-center h-24 text-center">
                <p className="text-xs text-gray-400">No applications yet</p>
                <button
                  onClick={onAddClick}
                  className="text-xs text-blue-400 hover:text-blue-600 mt-1"
                >
                  + Add one
                </button>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}