"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEMO_EMAIL = "demo@jobtracker.com";
const DEMO_PASSWORD = "demo1234";

const stats = [
  { value: "5", label: "Pipeline stages" },
  { value: "AI", label: "Cover letters" },
  { value: "24/7", label: "Access" },
];

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

    window.location.href = "/dashboard";
  };

  const handleLogin = () => signIn(email, password);
  const handleDemoLogin = () => signIn(DEMO_EMAIL, DEMO_PASSWORD, true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF9F6]">
      {/* ── Left Panel — charcoal, editorial ── */}
      <div className="relative bg-[#1C1B1A] flex flex-col justify-between p-8 sm:p-12 lg:p-16 md:w-[45%] overflow-hidden">
        {/* Faint background numeral */}
        <span className="pointer-events-none select-none absolute -bottom-16 -left-8 text-[260px] font-serif text-white/[0.04] leading-none">
          J
        </span>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="bg-[#D97706]/25 border border-[#D97706]/30 rounded-lg p-2.5">
            <Briefcase size={22} className="text-[#F5A623]" />
          </div>
          <span className="font-serif text-white text-xl tracking-wide">
            JobTracker
          </span>
        </div>

        {/* Editorial headline — the main content block 
        <p className="text-[#F5A623] text-xs font-medium uppercase tracking-[0.2em] mb-4">
            No. 01 — The Job Search
          </p>
        */}
        <div className="relative max-w-md py-10 lg:py-0">
          <h1 className="font-serif text-4xl lg:text-5xl text-white leading-[1.05] mt-5 mb-3">
            Applications,
            <br />
            organised with{" "}
            <span className="italic text-[#F5A623]">intention.</span>
          </h1>
          <p className="text-white/50 text-sm lg:text-base leading-relaxed mb-4">
            A quiet, structured place to track every application, draft cover
            letters, and read your pipeline.
          </p>

          {/* Stat row */}
          <div className="flex items-center gap-8 pb-8 border-b border-white/10 mb-3">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-2xl text-white">{s.value}</p>
                <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Demo CTA */}
          <button
            onClick={handleDemoLogin}
            disabled={demoLoading || loading}
            className="group w-full flex items-center gap-3 bg-[#F5A623] hover:bg-[#EE9D1C] text-[#1C1B1A] rounded-xl px-5 py-4 text-sm font-semibold transition-colors disabled:opacity-60"
          >
            <Sparkles size={16} />
            <span>
              {demoLoading ? "Loading demo..." : "Enter with a demo account"}
            </span>
            <ArrowUpRight
              size={16}
              className="ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>

        {/* Credit */}
        <div className="mt-4">
          <p className="relative text-xs text-white/30">
            Designed & developed by{" "}
            <span className="text-white/60 font-medium">
              Onyekachukwu Anene
            </span>
          </p>
        </div>
      </div>

      {/* ── Right Panel — warm off-white, form ── */}
      <div className="flex flex-col justify-center items-center px-8 py-12 md:w-[55%]">
        <div className="w-full max-w-sm">
          <h2 className="font-serif text-3xl text-[#1C1B1A] mb-1.5">
            Welcome back
          </h2>
          <p className="text-[#8A8580] text-sm mb-9">
            Sign in to pick up where you left off.
          </p>

          {/* Form */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="text-xs uppercase tracking-wide text-[#8A8580]"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-sm bg-white border-[#E8E4DD] focus:border-[#D97706] rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="password"
                className="text-xs uppercase tracking-wide text-[#8A8580]"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="h-12 text-sm bg-white border-[#E8E4DD] focus:border-[#D97706] rounded-lg"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2.5 rounded-lg">
                {error}
              </p>
            )}

            <Button
              onClick={handleLogin}
              disabled={loading || demoLoading || !email || !password}
              className="w-full h-12 bg-[#1C1B1A] hover:bg-[#2A2826] text-white text-sm font-medium rounded-lg mt-2 transition-colors"
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-[#E8E4DD]" />
            <span className="text-xs text-[#B8B2A8]">or</span>
            <div className="flex-1 h-px bg-[#E8E4DD]" />
          </div>

          {/* Demo shortcut on mobile */}
          <button
            onClick={handleDemoLogin}
            disabled={demoLoading || loading}
            className="w-full h-12 flex items-center justify-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/40 hover:bg-[#F5A623]/20 text-[#B4650A] text-sm font-medium rounded-lg transition-all duration-200 md:hidden"
          >
            <Sparkles size={14} />
            {demoLoading ? "Loading..." : "Try demo account"}
          </button>

          <p className="text-sm text-[#8A8580] text-center mt-4">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#1C1B1A] hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
