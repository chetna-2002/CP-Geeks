"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      const userId = authData.user?.id;
      if (!userId) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profile?.role?.toLowerCase() === "admin") {
        router.replace("/dashboard/admin");
      } else {
        router.replace("/dashboard/user");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };


  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password reset link sent to your email");
    }
  };

  return (
  <div className="relative min-h-screen overflow-hidden bg-background">

    {/* Background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute left-1/4 top-0 h-[350px] w-[350px] rounded-full bg-primary/[0.05] blur-[120px]" />

      <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/[0.03] blur-[120px]" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>

    {/* Back */}
    <Link
      href="/"
      className="absolute left-4 top-4 z-30 sm:left-6 sm:top-6"
    >
      <Button
        variant="ghost"
        className="gap-2 rounded-xl border border-border/30 bg-card/40 backdrop-blur-xl hover:bg-primary/[0.06]"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>
    </Link>

    {/* Layout */}
    <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

      {/* Left Side */}
      <div className="hidden flex-col justify-between border-r border-border/20 p-18 lg:flex">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-xl font-black text-primary shadow-lg shadow-primary/10">
              CG
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-foreground">
                CP Geeks
              </h1>
            </div>
          </div>

          <div className="mt-16 max-w-xl">
            <h2 className="text-5xl font-black leading-tight tracking-tight text-foreground">
              Master Modern Software 
              <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
                {" "}Engineering
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-foreground/65">
              Learn DSA, Full Stack Development, System Design,
              and interview preparation through focused mentorship,
              projects, and practical engineering roadmaps.
            </p>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-2 gap-4">

          {[
            {
              title: "Structured Roadmaps",
              desc: "Focused learning paths designed for long-term growth.",
            },

            {
              title: "Practical Learning",
              desc: "Projects and engineering-focused implementation.",
            },

            {
              title: "Interview Preparation",
              desc: "Coding rounds, DSA, and system design preparation.",
            },

            {
              title: "Mentorship",
              desc: "Guidance and support throughout the learning process.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/30 bg-card/40 p-5 backdrop-blur-xl"
            >
              <h3 className="font-semibold text-foreground">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center px-4 py-16 sm:px-6 lg:px-12">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="mb-10 text-center lg:hidden">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-xl font-black text-primary shadow-lg shadow-primary/10">
              CG
            </div>

            <h1 className="mt-5 text-3xl font-black text-foreground">
              Welcome Back
            </h1>

            <p className="mt-2 text-foreground/60">
              Continue your engineering journey
            </p>
          </div>

          {/* Card */}
          <div className="relative overflow-hidden rounded-[32px] border border-border/40 bg-card/50 backdrop-blur-xl shadow-2xl shadow-black/10">

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent" />

            <div className="relative z-10 p-8 pt-15">

              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary font-medium">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Secure Login
                </div>

                <h2 className="mt-6 text-3xl font-black tracking-tight text-foreground">
                  Sign In
                </h2>

                <p className="mt-2 text-foreground/60">
                  Access your dashboard and continue learning.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 rounded-xl border-border/30 bg-background/40 focus:border-primary"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">

                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-foreground"
                    >
                      Password
                    </Label>

                    <Link
                      type="button"
                      // onClick={handleForgotPassword}
                      href="/forgot-password"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 rounded-xl border-border/30 bg-background/40 pr-12 focus:border-primary"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 transition-colors hover:text-primary"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.01]"
                >
                  {isLoading
                    ? "Signing In..."
                    : "Continue Learning"}
                </Button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-border/20" />

                <span className="text-xs uppercase tracking-wide text-foreground/40">
                  CP Geeks
                </span>

                <div className="h-px flex-1 bg-border/20" />
              </div>

              {/* Signup */}
              <p className="text-center text-sm text-foreground/60">
                New to CP Geeks?{" "}

                <Link
                  href="/signup"
                  className="font-semibold text-primary hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
