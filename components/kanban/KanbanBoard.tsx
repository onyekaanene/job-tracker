"use client";

import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useApplicationStore } from "@/store/useApplicationStore";
import { ApplicationStatus } from "@/types";
import KanbanColumn from "./KanbanColumn";
import AddJobModal from "./AddJobModal";

const STATUSES: ApplicationStatus[] = [
  "wishlist",
  "applied",
  "interview",
  "offer",
  "rejected",
];

export default function KanbanBoard() {
  const { applications, moveApplication, loadApplications, loading } =
    useApplicationStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] =
    useState<ApplicationStatus>("applied");

  // Load data from Supabase when component mounts
  useEffect(() => {
    loadApplications();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    moveApplication(draggableId, destination.droppableId as ApplicationStatus);
  };

  const handleAddClick = (status: ApplicationStatus) => {
    setDefaultStatus(status);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm">Loading applications...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          {applications.length} application
          {applications.length !== 1 ? "s" : ""} tracked
        </p>
        <button
          onClick={() => handleAddClick("applied")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Add Application
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              applications={applications.filter((a) => a.status === status)}
              onAddClick={() => handleAddClick(status)}
            />
          ))}
        </div>
      </DragDropContext>

      <AddJobModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultStatus={defaultStatus}
      />
    </>
  );
}
