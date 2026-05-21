// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   Video,
//   Calendar,
//   FileText,
//   Code2,
//   ChevronRight,
//   Clock,
//   AlertCircle,
//   Download,
//   ExternalLink,
//   Users,
//   MessageCircle,
//   Sparkles,
//   CheckCircle2,
//   FileCode2
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// // Mock Data representing a student's active cohort track
// const UPCOMING_SESSIONS = [
//   {
//     id: "session-1",
//     title: "Advanced Graphs & Network Flow algorithms",
//     instructor: "Sandeep Jain",
//     date: "Today, May 20",
//     time: "08:00 PM - 10:00 PM",
//     status: "live-soon", // live-soon, upcoming, completed
//     resources: [
//       {
//         name: "Pre-read: Graph Traversals Recap.pdf",
//         type: "pdf",
//         size: "2.4 MB"
//       },
//       { name: "Initial Problem Set (LeetCode / Codeforces)", type: "link" }
//     ]
//   },
//   {
//     id: "session-2",
//     title: "System Design: Scaling WebSockets for Real-time Apps",
//     instructor: "Harkirat Singh",
//     date: "Friday, May 22",
//     time: "07:30 PM - 09:30 PM",
//     status: "upcoming",
//     resources: [
//       { name: "Architectural Overview slides.pdf", type: "pdf", size: "4.1 MB" }
//     ]
//   },
//   {
//     id: "session-3",
//     title: "React 19 Server Actions & Deep Dive Fiber Architecture",
//     instructor: "Akshay Saini",
//     date: "Sunday, May 24",
//     time: "04:00 PM - 07:00 PM",
//     status: "upcoming",
//     resources: []
//   }
// ];

// const PAST_SESSIONS = [
//   {
//     id: "past-1",
//     title: "Dynamic Programming: Knapsack & Matrix Chain Multiplications",
//     date: "May 17, 2026",
//     attended: true,
//     resources: [
//       { name: "Handwritten Classroom Notes.pdf", type: "pdf", size: "8.7 MB" },
//       { name: "Final Verified Code Repository", type: "code" }
//     ]
//   },
//   {
//     id: "past-2",
//     title: "System Design Fundamentals: High Availability & Load Balancing",
//     date: "May 15, 2026",
//     attended: true,
//     resources: [
//       {
//         name: "Load Balancer Configurations clone.zip",
//         type: "zip",
//         size: "1.2 MB"
//       }
//     ]
//   }
// ];

// export default function StudentLiveDashboard() {
//   const [countdown, setCountdown] = useState("05h 11m 04s");
//   const [isJoined, setIsJoined] = useState(false);

//   // Simple placeholder effect simulating real-time countdown tracking
//   useEffect(() => {
//     const timer = setInterval(() => {
//       // In production, compute true difference to next live session row
//       setCountdown("05h 09m 42s");
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const nextSession = UPCOMING_SESSIONS[0];

//   return (
//     <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
//       {/* Background Subtle Grids & Blurred Blobs matching your visual identity */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-primary/[0.08] blur-[120px] rounded-full" />
//         <div className="absolute bottom-1/3 left-0 h-[350px] w-[350px] bg-primary/[0.04] blur-[100px] rounded-full" />
//         <div
//           className="absolute inset-0 opacity-[0.02]"
//           style={{
//             backgroundImage:
//               "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
//             backgroundSize: "40px 40px"
//           }}
//         />
//       </div>

//       <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/20 pb-6">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
//               <Sparkles className="h-3 w-3" /> Active Track
//             </div>
//             <h1 className="text-3xl font-black tracking-tight mt-2">
//               DSA & System Design Cohort
//             </h1>
//             <p className="text-foreground/60 text-sm mt-1">
//               Welcome back! Keep up the real-time consistency streak.
//             </p>
//           </div>
//           <div className="flex items-center gap-3">
//             <Button
//               variant="outline"
//               className="h-11 rounded-xl border-border/40 bg-card/40 gap-2 hover:bg-primary/10 transition-all"
//             >
//               <MessageCircle className="h-4 w-4 text-primary" /> Join Discord
//               Group
//             </Button>
//           </div>
//         </div>

//         {/* 1. DYNAMIC "NEXT ACTION" HERO PORTAL */}
//         <section className="relative overflow-hidden rounded-[32px] border border-primary/30 bg-gradient-to-br from-card/80 via-card/30 to-background p-6 md:p-8 shadow-2xl shadow-primary/5">
//           <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 blur-2xl rounded-full" />

//           <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
//             <div className="space-y-4 max-w-3xl">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium">
//                 <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
//                 Live Session Countdown
//               </div>
//               <h2 className="text-2xl md:text-3xl font-black leading-tight tracking-tight">
//                 {nextSession.title}
//               </h2>
//               <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70">
//                 <span className="flex items-center gap-2">
//                   <Users className="h-4 w-4 text-primary" /> Mentor:{" "}
//                   {nextSession.instructor}
//                 </span>
//                 <span className="flex items-center gap-2">
//                   <Clock className="h-4 w-4 text-primary" /> {nextSession.date}{" "}
//                   • {nextSession.time}
//                 </span>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-4 min-w-[280px]">
//               <div className="rounded-2xl border border-border/30 bg-background/50 p-4 text-center flex-1 lg:flex-none">
//                 <p className="text-xs uppercase tracking-wider text-foreground/40 font-semibold">
//                   Starts In
//                 </p>
//                 <p className="text-xl font-mono font-bold mt-1 text-primary">
//                   {countdown}
//                 </p>
//               </div>

//               {/* Join Link changes visual appearance when class goes live */}
//               <Button
//                 size="lg"
//                 className="h-14 px-8 rounded-xl font-bold gap-2 bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]"
//                 onClick={() => window.open("https://zoom.us", "_blank")}
//               >
//                 <Video className="h-5 w-5" /> Join Live Link
//               </Button>
//             </div>
//           </div>

//           {/* Core Safeguard Warning since sessions are live-only */}
//           <div className="mt-6 flex items-center gap-2.5 text-xs text-yellow-500/80 border-t border-border/20 pt-4">
//             <AlertCircle className="h-4 w-4 shrink-0" />
//             <span>
//               Reminder: This cohort relies exclusively on live execution. Ensure
//               your development sandbox environment is ready before class.
//             </span>
//           </div>
//         </section>

//         {/* MAIN BODY CONFIGURATION */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
//           {/* LEFT SIDE: CHRONOLOGICAL TIMELINE PATHWAY */}
//           <div className="space-y-6">
//             <div className="flex items-center gap-2">
//               <Calendar className="h-5 w-5 text-primary" />
//               <h3 className="text-xl font-bold tracking-tight">
//                 Upcoming Syllabus Milestones
//               </h3>
//             </div>

//             <div className="relative border-l border-border/30 ml-4 pl-6 space-y-8 py-2">
//               {UPCOMING_SESSIONS.map((session, idx) => {
//                 const isFirst = idx === 0;
//                 return (
//                   <div key={session.id} className="relative group">
//                     {/* Timeline Node Connector */}
//                     <div
//                       className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 bg-background transition-all duration-300 ${isFirst
//                         ? "border-primary scale-125 ring-4 ring-primary/20"
//                         : "border-border/60 group-hover:border-primary"}`}
//                     />

//                     <div className="rounded-2xl border border-border/30 bg-card/30 p-5 space-y-4 hover:border-primary/20 transition-all duration-300">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//                         <h4 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">
//                           {session.title}
//                         </h4>
//                         <span className="text-xs font-medium text-foreground/40 whitespace-nowrap bg-background/50 border border-border/20 px-2.5 py-1 rounded-full self-start sm:self-center">
//                           {session.date}
//                         </span>
//                       </div>

//                       {/* Attached Real-Time Learning resources */}
//                       {session.resources.length > 0 &&
//                         <div className="border-t border-border/10 pt-3">
//                           <p className="text-xs font-semibold text-foreground/40 mb-2 uppercase tracking-wide">
//                             Prerequisite Files
//                           </p>
//                           <div className="flex flex-wrap gap-2">
//                             {session.resources.map((res, rIdx) =>
//                               <div
//                                 key={rIdx}
//                                 className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/30 bg-background/40 text-xs text-foreground/80 hover:border-primary/30 cursor-pointer transition-all"
//                               >
//                                 {res.type === "pdf"
//                                   ? <FileText className="h-3.5 w-3.5 text-blue-400" />
//                                   : <ExternalLink className="h-3.5 w-3.5 text-purple-400" />}
//                                 <span>
//                                   {res.name}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                         </div>}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* RIGHT SIDE: ROBUST LEARNING FALLBACKS & HISTORY */}
//           <div className="space-y-6 lg:sticky lg:top-6">
//             {/* Live Fallback Strategy Block */}
//             <Card className="border-border/40 bg-card/40 backdrop-blur-xl rounded-2xl overflow-hidden">
//               <CardContent className="p-5 space-y-4">
//                 <div className="flex items-center gap-3">
//                   <div className="h-10 w-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
//                     <AlertCircle className="h-5 w-5" />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-sm">Attendance Backup Hub</h4>
//                     <p className="text-xs text-foreground/50">
//                       Cannot make a live slot?
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-xs text-foreground/70 leading-relaxed">
//                   Notify mentors ahead of time if you cannot catch a live class.
//                   You can claim community-shared markdown notes or book a 1:1
//                   catchup triage window.
//                 </p>
//                 <div className="grid grid-cols-2 gap-2 pt-1">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="rounded-lg text-xs h-9 border-border/40"
//                   >
//                     Request Absence
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="rounded-lg text-xs h-9 border-border/40 text-primary hover:bg-primary/10"
//                   >
//                     Claim Notes
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Historical Class Reference Logs */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <CheckCircle2 className="h-4 w-4 text-green-400" />
//                 <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/50">
//                   Completed Modules
//                 </h3>
//               </div>

//               <div className="space-y-3">
//                 {PAST_SESSIONS.map(past =>
//                   <div
//                     key={past.id}
//                     className="rounded-2xl border border-border/20 bg-card/20 p-4 space-y-3"
//                   >
//                     <div>
//                       <h4 className="font-bold text-sm leading-tight text-foreground/80 line-clamp-1">
//                         {past.title}
//                       </h4>
//                       <p className="text-xs text-foreground/40 mt-1">
//                         Concluded • {past.date}
//                       </p>
//                     </div>

//                     {past.resources.length > 0 &&
//                       <div className="flex flex-col gap-1.5 border-t border-border/10 pt-2.5">
//                         {past.resources.map((res, idx) =>
//                           <div
//                             key={idx}
//                             className="flex items-center justify-between text-xs text-foreground/60 hover:text-primary transition-colors cursor-pointer py-0.5 group"
//                           >
//                             <span className="flex items-center gap-2 truncate">
//                               {res.type === "pdf"
//                                 ? <FileText className="h-3.5 w-3.5 text-blue-400/80" />
//                                 : <FileCode2 className="h-3.5 w-3.5 text-green-400/80" />}
//                               <span className="truncate">
//                                 {res.name}
//                               </span>
//                             </span>
//                             <Download className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
//                           </div>
//                         )}
//                       </div>}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  BookOpen,
  Briefcase,
  User,
  ArrowRight,
  Sparkles,
  Compass,
  GraduationCap,
  Bell,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function StudentLiveDashboard() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-pulse font-mono text-sm text-foreground/40">
          Initializing workspace...
        </div>
      </div>
    );
  }

  const firstName = profile?.full_name?.split(" ")[0] || "Engineer";

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 pb-20">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-primary/[0.05] blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 left-0 h-[350px] w-[350px] bg-primary/[0.03] blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* HEADER / GREETING */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Welcome to the Portal
            </div>
            <h1 className="text-4xl font-black tracking-tight">
              Good to see you, {firstName}.
            </h1>
            <p className="text-foreground/60 text-base mt-2 max-w-xl">
              This is your central command for tracking active cohorts, applying to partner jobs, and managing your engineering profile.
            </p>
          </div>
          
          <Link href="/courses">
            <Button className="h-11 rounded-xl font-bold shadow-lg shadow-primary/10 hover:scale-105 transition-all">
              <Compass className="mr-2 h-4 w-4" /> Explore Courses
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          
          {/* LEFT SIDE: LEARNING PATHWAY (EMPTY STATE) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border/20 pb-4">
              <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
                <GraduationCap className="h-5 w-5 text-primary" /> Active Enrollments
              </div>
            </div>

            {/* Empty State Banner */}
            <div className="relative overflow-hidden rounded-[32px] border border-border/40 bg-card/40 p-10 md:p-14 text-center backdrop-blur-xl shadow-2xl shadow-primary/5 group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10 text-primary shadow-inner mb-6">
                  <BookOpen className="h-10 w-10 opacity-80" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3">
                  No Active Tracks Yet
                </h3>
                <p className="text-foreground/60 max-w-md mx-auto leading-relaxed mb-8">
                  You aren't enrolled in any live cohorts at the moment. Join a course to unlock live mentorship, DSA sheets, and real-time tracking.
                </p>
                <Link href="/courses">
                  <Button size="lg" className="h-12 rounded-xl font-bold px-8 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                    Browse Curriculum <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="rounded-[24px] border border-border/30 bg-background/50 p-6 flex items-start gap-4">
              <div className="mt-1 bg-yellow-500/10 text-yellow-500 rounded-full p-1.5 shrink-0">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">System Update</h4>
                <p className="text-sm text-foreground/60 mt-1 leading-relaxed">
                  Make sure your GitHub and LinkedIn links are updated in your Profile settings before applying to any roles on the Job Board.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: QUICK ACTIONS & PROFILE STATUS */}
          <div className="space-y-6">
            
            <h3 className="text-xl font-bold tracking-tight border-b border-border/20 pb-4">
              Quick Actions
            </h3>

            {/* Profile Card */}
            <Card className="border-border/40 bg-card/40 backdrop-blur-xl rounded-2xl overflow-hidden hover:border-primary/30 transition-colors group">
              <CardContent className="p-0">
                <Link href="/dashboard/user/profile" className="flex items-center gap-4 p-5">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                      Engineering Profile
                    </h4>
                    <p className="text-xs text-foreground/50 mt-0.5">
                      Update your resume & links
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-foreground/30 ml-auto group-hover:translate-x-1 group-hover:text-primary transition-all" />
                </Link>
              </CardContent>
            </Card>

            {/* Job Board Card */}
            <Card className="border-border/40 bg-card/40 backdrop-blur-xl rounded-2xl overflow-hidden hover:border-primary/30 transition-colors group">
              <CardContent className="p-0">
                <Link href="/dashboard/user/jobs" className="flex items-center gap-4 p-5">
                  <div className="h-12 w-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-foreground group-hover:text-green-500 transition-colors">
                      Career Portal
                    </h4>
                    <p className="text-xs text-foreground/50 mt-0.5">
                      Explore partner opportunities
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-foreground/30 ml-auto group-hover:translate-x-1 group-hover:text-green-500 transition-all" />
                </Link>
              </CardContent>
            </Card>

            {/* Practice Card (Teaser) */}
            <Card className="border-border/40 bg-card/40 backdrop-blur-xl rounded-2xl overflow-hidden opacity-80 cursor-not-allowed">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/40">
                  <Code2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-foreground/60">
                    DSA Sheets
                  </h4>
                  <p className="text-xs text-foreground/40 mt-0.5">
                    Unlocks with enrollment
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}