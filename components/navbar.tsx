"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  LogOut,
  User,
  Menu,
  Code2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";

import { createClient } from "@/utils/supabase/client";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [user, setUser] = useState<any>(null);

  const [username, setUsername] = useState<string>("User");

  const supabase = createClient();

  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const getUserAndProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUser(null);
        return;
      }

      setUser(user);

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (profile?.full_name) {
        setUsername(profile.full_name);
      }
    };

    getUserAndProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setUser(null);

    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/70 backdrop-blur-xl">

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[180px] w-[180px] rounded-full bg-primary/[0.04] blur-3xl" />
      </div>

      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}
        <div className="flex items-center gap-10">

          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-lg shadow-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/30 group-hover:bg-primary/15">

              <Code2 className="h-5 w-5" />

              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-foreground">
                CP Geeks
              </h1>

              <p className="text-xs text-foreground/50">
                Structured Engineering Learning
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-2 rounded-2xl border border-border/30 bg-card/40 p-2 backdrop-blur-xl lg:flex">

            {[
              {
                href: "/courses",
                label: "Courses",
              },

              {
                href: "/dsa-sheets",
                label: "DSA Sheets",
              },

              {
                href: "/jobs",
                label: "Jobs",
              },

              {
                href: "/instructors",
                label: "Mentors",
              },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="rounded-xl px-4 py-2 text-sm font-medium text-foreground/65 transition-all duration-300 hover:bg-primary/[0.06] hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:bg-primary/[0.06]"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              )}
            </Button>
          )}

          {/* Auth */}
          {!user ? (
            <div className="flex items-center gap-3">

              <Link href="/login">
                <Button
                  variant="ghost"
                  className="rounded-xl text-foreground/70 hover:bg-primary/[0.06] hover:text-primary"
                >
                  Log In
                </Button>
              </Link>

              <Link href="/signup">
                <Button className="rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <DropdownMenu>

              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto rounded-2xl border border-border/30 bg-card/40 px-3 py-2 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:bg-primary/[0.06]"
                >
                  <div className="flex items-center gap-3">

                    {/* Avatar */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                      {username
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="hidden text-left sm:block">
                      <p className="max-w-[120px] truncate text-sm font-semibold text-foreground">
                        {username}
                      </p>

                      <p className="max-w-[140px] truncate text-xs text-foreground/50">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 rounded-2xl border-border/30 bg-background/95 backdrop-blur-xl"
              >

                {/* User */}
                <div className="border-b border-border/20 px-4 py-4">
                  <p className="font-semibold text-foreground">
                    {username}
                  </p>

                  <p className="mt-1 text-xs text-foreground/55">
                    {user.email}
                  </p>
                </div>

                {/* Profile */}
                <DropdownMenuItem
                  className="cursor-pointer gap-2 py-3"
                  onClick={() =>
                    router.push("/dashboard/user/profile")
                  }
                >
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                  className="cursor-pointer gap-2 py-3 text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}