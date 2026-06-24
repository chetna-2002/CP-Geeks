"use client";
import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { profile, loading } = useAuth();
  const router = useRouter();

  // State to manage mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(
    () => {
      if (!loading) {
        if (!profile) router.replace("/login");
        else if (profile.role !== "admin") router.replace("/dashboard/user");
      }
    },
    [profile, loading]
  );

  if (loading) return null;

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* We pass the open state and a close handler to the sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden w-full lg:w-[calc(100%-16rem)]">
        {/* We pass the toggle handler to the header */}
        <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
