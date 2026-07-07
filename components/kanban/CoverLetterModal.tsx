"use client";

import { useState, useEffect } from "react";
import { Application } from "@/types";
import { X, Copy, Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type CoverLetterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  application: Application;
};

export default function CoverLetterModal({
  isOpen,
  onClose,
  application,
}: CoverLetterModalProps) {
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) generate();
  }, [isOpen]);

  const generate = async () => {
    setLoading(true);
    setError("");
    setCoverLetter("");

    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: application.companyName,
          role: application.role,
          notes: application.notes,
          location: application.location,
          salary: application.salary,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setCoverLetter(data.coverLetter);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Cover Letter
              </h2>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {application.role} at {application.companyName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <Loader2 size={24} className="animate-spin text-blue-500" />
              <p className="text-sm text-gray-400">
                Claude is writing your cover letter...
              </p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-lg">
                {error}
              </p>
              <Button variant="outline" onClick={generate}>
                Try again
              </Button>
            </div>
          )}

          {coverLetter && !loading && (
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-sm text-gray-700 leading-7 whitespace-pre-wrap">
                {coverLetter}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {coverLetter && !loading && (
          <div className="flex gap-3 p-6 border-t flex-shrink-0">
            <Button variant="outline" onClick={generate} className="flex-1">
              Regenerate
            </Button>
            <Button
              onClick={handleCopy}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {copied ? (
                <span className="flex items-center gap-2">
                  <Check size={14} />
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Copy size={14} />
                  Copy to Clipboard
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
