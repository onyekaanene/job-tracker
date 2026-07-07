"use client";

import { useState, useEffect } from "react";
import { useApplicationStore } from "@/store/useApplicationStore";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";

export default function AIInsights() {
  const applications = useApplicationStore((s) => s.applications);
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (applications.length > 0) fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applications }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setInsights(data.insights);
    } catch {
      setError("Could not load insights right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-1.5 rounded-lg">
            <Sparkles size={16} className="text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              AI Career Insights
            </h3>
            <p className="text-xs text-gray-400">Powered by Claude</p>
          </div>
        </div>
        <button
          onClick={fetchInsights}
          disabled={loading}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Refresh insights"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Content */}
      {loading && (
        <div className="flex items-center gap-3 py-4">
          <Loader2
            size={16}
            className="animate-spin text-blue-400 flex-shrink-0"
          />
          <p className="text-sm text-gray-400">
            Analysing your job search pipeline...
          </p>
        </div>
      )}

      {error && !loading && (
        <p className="text-sm text-red-400 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {insights && !loading && (
        <p className="text-sm text-gray-600 leading-7 whitespace-pre-wrap">
          {insights}
        </p>
      )}

      {!insights && !loading && !error && (
        <p className="text-sm text-gray-400">
          Add some applications to get personalised insights.
        </p>
      )}
    </div>
  );
}
