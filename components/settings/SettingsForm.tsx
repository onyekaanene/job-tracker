"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsForm() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) setEmail(user.email);
    };
    getUser();
  }, []);

  const handlePasswordUpdate = async () => {
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg flex flex-col gap-6">
      {/* Account Info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Account</h3>
        <div className="flex flex-col gap-1.5">
          <Label>Email</Label>
          <Input value={email} disabled className="bg-gray-50 text-gray-500" />
          <p className="text-xs text-gray-400">
            Email cannot be changed at this time.
          </p>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}
          {message && (
            <p className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
              {message}
            </p>
          )}

          <Button
            onClick={handlePasswordUpdate}
            disabled={loading || !newPassword || !confirmPassword}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-100 p-6">
        <h3 className="font-semibold text-red-500 mb-1">Danger Zone</h3>
        <p className="text-sm text-gray-400 mb-4">
          Once you delete your account, there is no going back.
        </p>
        <Button
          variant="outline"
          className="border-red-200 text-red-500 hover:bg-red-50"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}
