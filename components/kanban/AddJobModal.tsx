"use client";

import { useState } from "react";
import { useApplicationStore } from "@/store/useApplicationStore";
import { ApplicationStatus } from "@/types";
import { X, Sparkles, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Tab = "manual" | "ai";

type AddJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultStatus?: ApplicationStatus;
};

const emptyForm = (defaultStatus: ApplicationStatus) => ({
  companyName: "",
  role: "",
  status: defaultStatus,
  appliedDate: "",
  jobUrl: "",
  salary: "",
  location: "",
  notes: "",
});

export default function AddJobModal({
  isOpen,
  onClose,
  defaultStatus = "applied",
}: AddJobModalProps) {
  const addApplication = useApplicationStore((s) => s.addApplication);
  const [tab, setTab] = useState<Tab>("ai");
  const [formData, setFormData] = useState(emptyForm(defaultStatus));
  const [jobText, setJobText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [parsed, setParsed] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleParse = async () => {
    if (!jobText.trim()) return;
    setParsing(true);
    setParseError("");
    setParsed(false);

    try {
      const res = await fetch("/api/parse-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: jobText }),
      });

      const data = await res.json();

      if (data.error) {
        setParseError(data.error);
        return;
      }

      // Fill the form with parsed data
      setFormData({
        companyName: data.companyName || "",
        role: data.role || "",
        status: defaultStatus,
        appliedDate: "",
        jobUrl: data.jobUrl || "",
        salary: data.salary || "",
        location: data.location || "",
        notes: data.notes || "",
      });

      setParsed(true);
      // Switch to manual tab so user can review and edit
      setTab("manual");
    } catch {
      setParseError("Something went wrong. Please try again.");
    } finally {
      setParsing(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.companyName || !formData.role) return;
    addApplication(formData);
    setFormData(emptyForm(defaultStatus));
    setJobText("");
    setParsed(false);
    onClose();
  };

  const handleClose = () => {
    setFormData(emptyForm(defaultStatus));
    setJobText("");
    setParsed(false);
    setParseError("");
    setTab("ai");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Application
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setTab("ai")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
              tab === "ai"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Sparkles size={14} />
            Paste & Parse
          </button>
          <button
            onClick={() => setTab("manual")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
              tab === "manual"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FileText size={14} />
            Manual Entry
            {parsed && (
              <span className="bg-green-100 text-green-600 text-xs px-1.5 py-0.5 rounded-full">
                Filled
              </span>
            )}
          </button>
        </div>

        {/* AI Parse Tab */}
        {tab === "ai" && (
          <div className="p-6 flex flex-col gap-4">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={14} className="text-blue-500" />
                <p className="text-sm font-semibold text-blue-700">
                  AI Job Parser
                </p>
              </div>
              <p className="text-xs text-blue-500">
                Paste the full job description below. Claude will extract the
                company, role, salary, location, and more — automatically.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="jobText">Job Description</Label>
              <Textarea
                id="jobText"
                placeholder="Paste the full job posting here..."
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                rows={10}
                className="resize-none text-sm"
              />
            </div>

            {parseError && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                {parseError}
              </p>
            )}

            <Button
              onClick={handleParse}
              disabled={parsing || !jobText.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {parsing ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Parsing with Claude...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles size={14} />
                  Parse Job Description
                </span>
              )}
            </Button>
          </div>
        )}

        {/* Manual Entry Tab */}
        {tab === "manual" && (
          <>
            {parsed && (
              <div className="mx-6 mt-4 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                <p className="text-xs text-green-600 font-medium">
                  ✨ Fields filled by Claude — review and edit before saving.
                </p>
              </div>
            )}
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

            <div className="flex gap-3 p-6 border-t">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
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
          </>
        )}
      </div>
    </div>
  );
}