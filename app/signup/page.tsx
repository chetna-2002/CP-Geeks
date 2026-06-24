"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { icons, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const supabase = createClient();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      });

      if (error) {
        setError(error.message);
        return;
      }

      // ✅ USER CREATED → REDIRECT TO LOGIN
      if (data.user) {
        router.push("/login");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    "Live classes with industry experts",
    "Personalized mentorship",
    "Structured learning path",
    "24/7 community support"
  ];

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
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* Back */}
      <Link href="/" className="absolute left-4 top-4 z-30 sm:left-6 sm:top-6">
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
        {/* Left */}
        <div className="hidden flex-col border-r border-border/20 px-12 pb-12 pt-28 lg:flex">
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

            {/* Hero */}
            <div className="mt-16 max-w-xl">
              <h2 className="text-5xl font-black leading-tight tracking-tight text-foreground">
                Start Your Journey Into
                <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
                  {" "}Modern Software Engineering
                </span>
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-foreground/65">
                Learn DSA, Full Stack Development, System Design, and practical
                engineering skills through projects, mentorship, and focused
                learning paths.
              </p>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: "Structured Learning",
                desc: "Roadmaps designed for consistent long-term growth."
              },

              {
                title: "Live Mentorship",
                desc: "Guidance and support throughout your journey."
              },

              {
                title: "Practical Projects",
                desc: "Build real-world engineering projects and systems."
              },

              {
                title: "Interview Prep",
                desc: "DSA, system design, and hiring preparation."
              }
            ].map((item, i) =>
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
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-center px-4 py-16 sm:px-6 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile Brand */}
            <div className="mb-10 text-center lg:hidden">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-xl font-black text-primary shadow-lg shadow-primary/10">
                CG
              </div>

              <h1 className="mt-5 text-3xl font-black text-foreground">
                Create Account
              </h1>

              <p className="mt-2 text-foreground/60">
                Start your engineering journey
              </p>
            </div>

            {/* Card */}
            <div className="relative overflow-hidden rounded-[32px] border border-border/40 bg-card/50 backdrop-blur-xl shadow-2xl shadow-black/10">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent" />

              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary font-medium">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    Create Your Account
                  </div>

                  <h2 className="mt-6 text-3xl font-black tracking-tight text-foreground">
                    Sign Up
                  </h2>

                  <p className="mt-2 text-foreground/60">
                    Begin learning with CP Geeks today.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSignup} className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Full Name
                    </Label>

                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl border-border/30 bg-background/40 focus:border-primary"
                    />
                  </div>

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
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl border-border/30 bg-background/40 focus:border-primary"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-foreground"
                    >
                      Password
                    </Label>

                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 8 characters"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="h-12 rounded-xl border-border/30 bg-background/40 pr-12 focus:border-primary"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 transition-colors hover:text-primary"
                      >
                        {showPassword
                          ? <EyeOff className="h-5 w-5" />
                          : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-foreground"
                    >
                      Confirm Password
                    </Label>

                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="h-12 rounded-xl border-border/30 bg-background/40 pr-12 focus:border-primary"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 transition-colors hover:text-primary"
                      >
                        {showConfirmPassword
                          ? <EyeOff className="h-5 w-5" />
                          : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {error &&
                    <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4">
                      <p className="text-sm font-medium text-destructive">
                        {error}
                      </p>
                    </div>}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.01]"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
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

                {/* Login */}
                <p className="text-center text-sm text-foreground/60">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-primary hover:underline"
                  >
                    Sign In
                  </Link>
                </p>

                {/* Terms */}
                <div className="mt-7 border-t border-border/20 pt-5">
                  <p className="text-center text-xs leading-relaxed text-foreground/45">
                    By creating an account, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
