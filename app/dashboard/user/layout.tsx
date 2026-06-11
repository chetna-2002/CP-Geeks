// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '@/hooks/useAuth'

// export default function UserLayout({ children }: { children: React.ReactNode }) {
//   const { profile, loading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!loading) {
//       if (!profile) router.replace('/login')
//       else if (profile.role !== 'user') router.replace('/dashboard/admin')
//     }
//   }, [profile, loading])

//   if (loading) return null

//   return <>{children}</>
// }

// "use client";

// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useAuth } from "@/hooks/useAuth";
// import Link from "next/link";
// import { Tv, BrainCircuit, Briefcase, User, Sparkles } from "lucide-react";

// export default function UserLayout({
//   children
// }: {
//   children: React.ReactNode;
// }) {
//   const { profile, loading } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(
//     () => {
//       if (!loading) {
//         if (!profile) router.replace("/login");
//         else if (profile.role !== "Student" && profile.role !== "user") {
//           router.replace("/dashboard/admin");
//         }
//       }
//     },
//     [profile, loading, router]
//   );

//   if (loading || !profile) return null;

//   const navigationItems = [
//     { name: "Live Stream", href: "/dashboard/user", icon: Tv },
//     { name: "DSA Sheets", href: "/dsa-sheets", icon: BrainCircuit },
//     { name: "Jobs", href: "/jobs", icon: Briefcase },
//     { name: "Profile", href: "/dashboard/user/profile", icon: User }
//   ];

//   return (
//     <div className="min-h-screen bg-background text-foreground flex flex-col">
//       {/* GLOBAL RUNTIME STUDENT NAVBAR */}
//       <header className="sticky top-0 z-50 border-b border-border/30 bg-background/60 backdrop-blur-xl">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           {/* Logo Brand */}
//           <Link href="/" className="flex items-center gap-3 group">
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-sm font-black text-primary group-hover:scale-105 transition-all">
//               CG
//             </div>
//             <span className="font-black text-lg tracking-tight">
//               CP Geeks{" "}
//               <span className="text-xs text-primary font-medium ml-0.5">
//                 Portal
//               </span>
//             </span>
//           </Link>

//           {/* Core Navigation Items Hub */}
//           <nav className="hidden md:flex items-center gap-1">
//             {navigationItems.map(item => {
//               const Icon = item.icon;
//               const isActive = pathname === item.href;
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
//                     ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
//                     : "text-foreground/60 hover:text-foreground hover:bg-card/40"}`}
//                 >
//                   <Icon className="h-4 w-4" />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Sync Status / System Connection Stable Indicator */}
//           <div className="flex items-center gap-2.5">
//             <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
//             <span className="text-xs font-semibold uppercase tracking-wider text-green-400 font-mono hidden sm:inline-block">
//               Sync Active
//             </span>
//           </div>
//         </div>
//       </header>

//       {/* Main Content Mounting Section */}
//       <main className="flex-1 max-w-7xl w-full mx-auto relative z-10">
//         {children}
//       </main>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import {
  Tv,
  BrainCircuit,
  Briefcase,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  ShieldAlert
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(
    () => {
      if (!loading) {
        if (!profile) router.replace("/login");
        else if (profile.role !== "Student" && profile.role !== "user") {
          router.replace("/dashboard/admin");
        }
      }
    },
    [profile, loading, router]
  );

  async function handleLogout() {
    await supabase.auth.signOut();
    router.refresh();
    router.replace("/login");
  }

  if (loading || !profile) return null;

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard/user", icon: Tv },
    {
      name: "DSA Sheets",
      href: "/dashboard/user/dsa-sheets",
      icon: BrainCircuit
    },
    { name: "Jobs", href: "/dashboard/user/jobs", icon: Briefcase }
  ];

  // Extract initialization initials safely
  const userInitials = profile.full_name
    ? profile.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* GLOBAL PORTAL NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Brand Group */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-sm font-black text-primary group-hover:scale-105 transition-all">
              CG
            </div>
            <span className="font-black text-lg tracking-tight">
              CP Geeks{" "}
              <span className="text-xs text-primary font-medium ml-0.5">
                Portal
              </span>
            </span>
          </Link>

          {/* Center Navigation Options */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                    : "text-foreground/60 hover:text-foreground hover:bg-card/40"}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* DYNAMIC USER AVATAR & DROPDOWN MENU */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold leading-none">
                {profile.full_name || "Unnamed Student"}
              </span>
              <span className="text-xs text-foreground/40 mt-1 font-mono">
                {profile.email}
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-1.5 group p-1 rounded-xl hover:bg-card/60 transition-all border border-transparent hover:border-border/30">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 font-bold text-sm text-primary transition-transform group-hover:scale-105">
                    {userInitials}
                  </div>
                  <ChevronDown className="h-4 w-4 text-foreground/40 group-hover:text-foreground transition-colors" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 mt-2 border-border/30 bg-background/95 backdrop-blur-2xl rounded-xl p-15 animate-in fade-in-50 slide-in-from-top-1">
                <DropdownMenuLabel className="text-xs text-foreground/40 font-mono uppercase tracking-wider px-2.5 py-2">
                  My Account
                </DropdownMenuLabel>

                <DropdownMenuItem
                  asChild
                  className="rounded-lg cursor-pointer px-2.5 py-2 focus:bg-primary/10 focus:text-primary"
                >
                  <Link
                    href="/dashboard/user/profile"
                    className="flex items-center gap-2 w-full"
                  >
                    <User className="h-4 w-4" /> Profile Settings
                  </Link>
                </DropdownMenuItem>

                {profile.role === "Admin" &&
                  <DropdownMenuItem
                    asChild
                    className="rounded-lg cursor-pointer px-2.5 py-2 text-red-400 focus:bg-red-500/10 focus:text-red-400"
                  >
                    <Link
                      href="/dashboard/admin"
                      className="flex items-center gap-2 w-full"
                    >
                      <ShieldAlert className="h-4 w-4" /> Admin Console
                    </Link>
                  </DropdownMenuItem>}

                <DropdownMenuSeparator className="bg-border/20 my-1" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-lg cursor-pointer px-2.5 py-2 text-foreground/70 focus:bg-red-500/10 focus:text-red-500 transition-colors"
                >
                  <div className="flex items-center gap-2 w-full">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content Mounting Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto relative z-10">
        {children}
      </main>
    </div>
  );
}
