"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-md p-8 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Check your email
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            We sent a confirmation link to <strong>{email}</strong>. Click it to
            activate your account.
          </p>
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-md p-8">
        <div className="flex items-center gap-2 mb-8">
          <Briefcase className="text-blue-600" size={24} />
          <span className="font-bold text-gray-900 text-xl">JobTracker</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Create an account
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Start tracking your job search
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <Button
            onClick={handleSignup}
            disabled={loading || !email || !password || !confirmPassword}
            className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Credit */}
      <p className="text-xs text-gray-400 mt-6">
        Designed & developed by{" "}
        <span className="text-gray-500 font-medium">Onyekachukwu Anene</span>
      </p>

    </div>
  );
}
