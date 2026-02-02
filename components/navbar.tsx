"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, LogOut, User } from "lucide-react";
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
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            CG
          </div>
          <span className="text-xl font-bold text-foreground">CP Geeks</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/courses"
            className="text-sm font-medium text-foreground/70 hover:text-foreground"
          >
            Courses
          </Link>
          <Link
            href="/instructors"
            className="text-sm font-medium text-foreground/70 hover:text-foreground"
          >
            Instructors
          </Link>
          <Link
            href="/dsa-sheets"
            className="text-sm font-medium text-foreground/70 hover:text-foreground"
          >
            DSA Sheets
          </Link>
          <Link
            href="/jobs"
            className="text-sm font-medium text-foreground/70 hover:text-foreground"
          >
            Jobs
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full hover:bg-primary/10"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </Button>
          )}

          {/* Auth Section */}
          {!user ? (
            // 🔐 NOT LOGGED IN
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          ) : (
            // ✅ LOGGED IN → USER DROPDOWN
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                >
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                {/* User Info */}
                <div className="px-2 py-1.5 text-sm">
                  <p className="font-semibold">{username}</p>
                  <p className="text-xs text-foreground/60">{user.email}</p>
                </div>

                <DropdownMenuSeparator />

                {/* Profile */}
                <DropdownMenuItem
                  className="cursor-pointer gap-2"
                  onClick={() => router.push("/dashboard/user/profile")}
                >
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive gap-2"
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
