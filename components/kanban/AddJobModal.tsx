"use client";

import { useState } from "react";
import { useApplicationStore } from "@/store/useApplicationStore";
import { ApplicationStatus } from "@/types";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type AddJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultStatus?: ApplicationStatus;
};

export default function AddJobModal({
  isOpen,
  onClose,
  defaultStatus = "applied",
}: AddJobModalProps) {
  const addApplication = useApplicationStore((s) => s.addApplication);

  // Local state for form fields
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    status: defaultStatus as ApplicationStatus,
    appliedDate: "",
    jobUrl: "",
    salary: "",
    location: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!formData.companyName || !formData.role) return;
    addApplication(formData);
    // Reset form
    setFormData({
      companyName: "",
      role: "",
      status: defaultStatus,
      appliedDate: "",
      jobUrl: "",
      salary: "",
      location: "",
      notes: "",
    });
    onClose();
  };

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Add Application</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="companyName">Company *</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="e.g. Stripe"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="role">Role *</Label>
              <Input
                id="role"
                name="role"
                placeholder="e.g. Frontend Engineer"
                value={formData.role}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="wishlist">Wishlist</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="appliedDate">Date Applied</Label>
              <Input
                id="appliedDate"
                name="appliedDate"
                type="date"
                value={formData.appliedDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                name="salary"
                placeholder="e.g. $120k"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Remote"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="jobUrl">Job URL</Label>
            <Input
              id="jobUrl"
              name="jobUrl"
              placeholder="https://..."
              value={formData.jobUrl}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any notes about this application..."
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!formData.companyName || !formData.role}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Add Application
          </Button>
        </div>
      </div>
    </div>
  );
}