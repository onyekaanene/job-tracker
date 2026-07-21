"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEMO_EMAIL = "demo@jobtracker.com";
const DEMO_PASSWORD = "demo1234";

const features = [
  "Kanban pipeline across 5 stages",
  "AI job description parser & One-click cover letter generator",
  "Career insights powered by Claude",
];

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const signIn = async (emailVal: string, passwordVal: string, isDemo = false) => {
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

    // router.push("/dashboard");
    // router.refresh();
    
    // Full page reload ensures the proxy sees the fresh session cookie
    window.location.href = "/dashboard";
  };;

  const handleLogin = () => signIn(email, password);
  const handleDemoLogin = () => signIn(DEMO_EMAIL, DEMO_PASSWORD, true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── Left Panel — full height, blue ── */}
      <div className="relative bg-blue-700 flex flex-col justify-between p-10 md:w-[55%] min-h-[280px] md:min-h-screen">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="bg-white/20 rounded-lg p-1.5">
            <Briefcase size={26} className="text-white" />
          </div>
          <span className="font-bold text-white text-2xl tracking-tight">
            JobTracker
          </span>
        </div>

        {/* Main copy */}
        <div className="my-auto py-10">
          <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-4">
            AI-Powered Job Search
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
            Your job search, <span className="text-blue-200">finally</span>{" "}
            under control.
          </h1>
          <p className="text-blue-100 text-base leading-relaxed mb-4 max-w-md">
            Track every application, generate tailored cover letters, and get
            AI-powered coaching — all in one place.
          </p>

          {/* Features */}
          <ul className="flex flex-col gap-3 mb-7">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 text-sm text-blue-100"
              >
                <CheckCircle2
                  size={16}
                  className="text-blue-300 flex-shrink-0"
                />
                {f}
              </li>
            ))}
          </ul>

          {/* Demo CTA */}
          <button
            onClick={handleDemoLogin}
            disabled={demoLoading || loading}
            className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white rounded-xl px-5 py-3.5 text-sm font-medium transition-all duration-200 disabled:opacity-60"
          >
            <Sparkles size={15} className="text-blue-200" />
            <span>
              {demoLoading
                ? "Loading demo..."
                : "Try demo account — no sign up needed"}
            </span>
            <ArrowRight
              size={14}
              className="text-blue-300 group-hover:translate-x-0.5 transition-transform ml-auto"
            />
          </button>
        </div>

        {/* Credit */}
        <p className="text-xs text-blue-300">
          Designed & developed by{" "}
          <span className="text-blue-100 font-medium">Onyekachukwu Anene</span>
        </p>
      </div>

      {/* ── Right Panel — full height, white ── */}
      <div className="flex flex-col justify-center items-center bg-white px-8 py-12 md:w-[45%] min-h-screen">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Enter your credentials to continue.
          </p>

          {/* Form */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-sm text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 text-sm border-gray-200 focus:border-blue-400 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-sm text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="h-11 text-sm border-gray-200 focus:border-blue-400 rounded-lg"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-2.5 rounded-lg">
                {error}
              </p>
            )}

            <Button
              onClick={handleLogin}
              disabled={loading || demoLoading || !email || !password}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Demo shortcut on mobile */}
          <button
            onClick={handleDemoLogin}
            disabled={demoLoading || loading}
            className="w-full h-11 flex items-center justify-center gap-2 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm font-medium rounded-lg transition-all duration-200 md:hidden"
          >
            <Sparkles size={14} />
            {demoLoading ? "Loading..." : "Try demo account"}
          </button>

          {/* Sign up link */}
          <p className="text-sm text-gray-400 text-center mt-6">
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
    </div>
  );
}
