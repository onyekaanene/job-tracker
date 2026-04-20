"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Application } from "@/types";
import { MapPin, DollarSign, ExternalLink, Trash2 } from "lucide-react";
import { useApplicationStore } from "@/store/useApplicationStore";

type JobCardProps = {
  application: Application;
  index: number;
};

export default function JobCard({ application, index }: JobCardProps) {
  const deleteApplication = useApplicationStore((s) => s.deleteApplication);

  return (
    // Draggable wraps our card and makes it draggable
    // draggableId and index are required by the DnD library
    <Draggable draggableId={application.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-white rounded-xl border border-gray-200 p-4 mb-3
            shadow-sm cursor-grab active:cursor-grabbing
            transition-shadow duration-200
            ${snapshot.isDragging ? "shadow-lg rotate-1" : "hover:shadow-md"}
          `}
        >
          {/* Company and Role */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {application.companyName}
              </h3>
              <p className="text-gray-500 text-xs mt-0.5">{application.role}</p>
            </div>
            <button
              onClick={() => deleteApplication(application.id)}
              className="text-gray-300 hover:text-red-400 transition-colors ml-2 flex-shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {/* Optional details */}
          <div className="flex flex-col gap-1 mt-3">
            {application.location && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin size={11} />
                <span>{application.location}</span>
              </div>
            )}
            {application.salary && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <DollarSign size={11} />
                <span>{application.salary}</span>
              </div>
            )}
          </div>

          {/* Footer: date + link */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              {application.appliedDate
                ? new Date(application.appliedDate).toLocaleDateString()
                : "Not applied yet"}
            </span>
            {application.jobUrl && (
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}