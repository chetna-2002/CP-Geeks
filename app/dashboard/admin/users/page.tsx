"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  Search,
  Users,
  ShieldAlert,
  Trash2,
  Edit2,
  Calendar,
  Mail,
  Sparkles,
  User2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function UsersPage() {
  const supabase = createClient();

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<any>(null);
  const [newName, setNewName] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setUsers(data || []);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await supabase.from("profiles").delete().eq("id", id);
    fetchUsers();
  }

  async function toggleRole(user: any) {
    const role = user.role === "Admin" ? "User" : "Admin";
    await supabase.from("profiles").update({ role }).eq("id", user.id);
    fetchUsers();
  }

  function openEdit(user: any) {
    setEditUser(user);
    setNewName(user.full_name || "");
  }

  async function saveName() {
    if (!newName.trim()) return;
    await supabase
      .from("profiles")
      .update({ full_name: newName })
      .eq("id", editUser.id);
    setEditUser(null);
    fetchUsers();
  }

  const filtered = users.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  const admins = useMemo(
    () => users.filter((u) => u.role?.trim().toLowerCase() === "admin").length,
    [users]
  );

  const students = useMemo(
    () => users.filter((u) => u.role?.trim().toLowerCase() !== "admin").length,
    [users]
  );

  return (
    <div className="space-y-8 p-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[32px] border border-border/30 bg-card/25 p-8">
        <div className="absolute left-0 top-0 h-[220px] w-[220px] rounded-full bg-primary/[0.05] blur-[110px]" />
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            User Management
          </div>
          <h1 className="text-5xl font-black">Users Dashboard</h1>
          <p className="text-foreground/60">
            Manage users, permissions and platform access.
          </p>
        </div>
      </section>

      {/* METRICS */}
      <div className="grid gap-5 md:grid-cols-3">
        <Metric icon={<Users />} value={users.length} label="Total Users" />
        <Metric icon={<ShieldAlert />} value={admins} label="Admins" />
        <Metric icon={<User2 />} value={students} label="Students" />
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
        <Input
          placeholder="Search users"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="h-12 pl-11"
        />
      </div>

      {/* LIST */}
      <Card className="border-border/30">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">Loading users...</div>
          ) : visible.length === 0 ? (
            <div className="p-8 text-center text-foreground/60">
              No users found
            </div>
          ) : (
            visible.map((user) => (
              <div
                key={user.id}
                className="flex flex-col gap-4 border-b border-border/20 p-6 transition-all hover:bg-primary/[0.03] lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 font-bold text-primary">
                    {user.full_name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {user.full_name || "Unnamed User"}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-4 text-sm text-foreground/60">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "-"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${user.role === "Admin" ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"}`}
                  >
                    {user.role}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEdit(user)}
                    className="border-border/30 bg-background/40 text-foreground transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleRole(user)}
                    className="hover:border-yellow-500/30 hover:bg-yellow-500/10 hover:text-yellow-500"
                  >
                    <ShieldAlert className="h-4 w-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-border/30 bg-background/95 backdrop-blur-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete User?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="hover:bg-primary/10 hover:text-foreground">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          <ChevronLeft />
        </Button>
        <div className="px-4 py-2">
          {page}/{totalPages || 1}
        </div>
        <Button
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          <ChevronRight />
        </Button>
      </div>

      {/* EDIT */}
      <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
        <DialogContent className="border-border/30 bg-background/95 backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle>Edit Name</DialogTitle>
          </DialogHeader>
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditUser(null)}
              className="border-border/30 bg-background/40 text-foreground transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/30"
            >
              Cancel
            </Button>
            <Button onClick={saveName}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Metric({ icon, value, label }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-primary">{icon}</div>
        <h2 className="mt-4 text-4xl font-black">{value}</h2>
        <p className="text-foreground/60">{label}</p>
      </CardContent>
    </Card>
  );
}
