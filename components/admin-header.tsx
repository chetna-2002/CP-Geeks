"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun, User, LogOut, ShieldCheck, Sparkles, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";

// Added onMenuClick prop to wire the hamburger to the layout
export function AdminHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const getPageName = () => {
    if (pathname.includes("courses")) return "Courses";
    if (pathname.includes("placements")) return "Placements";
    if (pathname.includes("users")) return "Users";
    if (pathname.includes("jobs")) return "Jobs";
    if (pathname.includes("dsa-sheets")) return "DSA Sheets";
    if (pathname.includes("instructors")) return "Instructors";
    if (pathname.includes("payments")) return "Payments";
    return "Dashboard";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60">
      <div className="relative flex h-[72px] w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-0 top-0 h-[180px] w-[280px] bg-primary/[0.04] blur-[90px]" />
        </div>

        {/* LEFT */}
        <div className="relative flex items-center gap-3 sm:gap-4">
          
          {/* Mobile Hamburger Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden shrink-0 h-10 w-10 rounded-xl border border-border/30 bg-card/50 backdrop-blur-xl"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Icon - Hidden on very small screens to save space */}
          <div className="hidden sm:flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-primary/20 bg-primary/10 shadow-lg shadow-primary/10">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-foreground truncate max-w-[120px] sm:max-w-none">
                Admin
                <span className="hidden sm:inline"> Dashboard</span>
              </h1>

              <span className="hidden sm:inline-block rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                Internal
              </span>
            </div>

            <p className="text-[10px] sm:text-xs text-foreground/50 truncate">
              {getPageName()}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center gap-2 sm:gap-3">
          
          {/* Theme */}
          {mounted && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-xl sm:rounded-2xl border-border/30 bg-card/50 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:scale-105"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          )}

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-border/30 bg-card/50 px-2 py-1.5 sm:px-3 sm:py-2 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
              >
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-primary font-bold text-sm sm:text-base text-primary-foreground shadow-lg shadow-primary/20">
                  {user?.email?.[0]?.toUpperCase() || "A"}
                </div>

                <div className="hidden text-left md:block">
                  <p className="max-w-[140px] truncate text-sm font-semibold">
                    {user?.user_metadata?.full_name || "Admin"}
                  </p>
                  <p className="text-xs text-foreground/50">
                    Administrator
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-64 rounded-2xl border-border/30 bg-card/95 backdrop-blur-2xl"
            >
              <div className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                    {user?.email?.[0]?.toUpperCase() || "A"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-semibold truncate">
                      {user?.user_metadata?.full_name || "Admin"}
                    </p>
                    <p className="max-w-[180px] truncate text-xs text-foreground/50">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* <DropdownMenuSeparator /> */}

              {/* <DropdownMenuItem
                onClick={() => router.push("/dashboard/admin/profile")}
                className="cursor-pointer gap-2 py-2"
              >
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem> */}

              

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer gap-2 py-2 text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
      </div>
    </header>
  );
}