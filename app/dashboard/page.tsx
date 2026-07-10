"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEMO_EMAIL = "demo@jobtracker.com";
const DEMO_PASSWORD = "demo1234";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const signIn = async (
    emailVal: string,
    passwordVal: string,
    isDemo = false,
  ) => {
    if (isDemo) setDemoLoading(true);
    else setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: emailVal,
      password: passwordVal,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      setDemoLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const handleLogin = () => signIn(email, password);
  const handleDemoLogin = () => signIn(DEMO_EMAIL, DEMO_PASSWORD, true);

  const features = [
    "Track all your applications in one place",
    "Drag-and-drop Kanban pipeline",
    "AI-powered cover letter generator",
    "Smart career insights powered by Claude",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        {/* ── Left Column ── */}
        <div className="bg-blue-600 text-white flex flex-col justify-between p-8 md:w-5/12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-10">
              <Briefcase size={24} className="text-white" />
              <span className="font-bold text-xl">JobTracker</span>
            </div>

            <h1 className="text-3xl font-bold leading-snug mb-3">
              Your job search, <span className="text-blue-200">organised.</span>
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed mb-8">
              Stop losing track of applications. JobTracker keeps your entire
              pipeline in one clean, AI-powered workspace.
            </p>

            {/* Feature list */}
            <ul className="flex flex-col gap-3 mb-10">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-blue-100"
                >
                  <CheckCircle
                    size={16}
                    className="text-blue-300 mt-0.5 flex-shrink-0"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Demo Banner */}
          <div className="bg-blue-500 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={14} className="text-blue-200" />
              <p className="text-sm font-semibold text-white">
                Explore instantly — no sign up needed
              </p>
            </div>
            <p className="text-xs text-blue-200 mb-3">
              Click below to log in with a pre-filled demo account and see
              everything in action.
            </p>
            <Button
              onClick={handleDemoLogin}
              disabled={demoLoading || loading}
              className="w-full bg-white text-blue-600 hover:bg-blue-50 text-sm font-semibold"
            >
              {demoLoading ? "Loading demo..." : "✨ Try demo account"}
            </Button>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="flex flex-col justify-center p-8 md:w-7/12">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Log in to your account to continue.
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">sign in with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Login Form */}
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
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <Button
              onClick={handleLogin}
              disabled={loading || demoLoading || !email || !password}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm mt-2"
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </div>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Credit */}
      <p className="text-xs text-gray-400 mt-4">
        Designed & developed by{" "}
        <span className="text-gray-500 font-medium">Onyekachukwu Anene</span>
      </p>
    </div>
  );
}
