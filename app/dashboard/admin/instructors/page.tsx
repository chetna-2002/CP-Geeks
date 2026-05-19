"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Users,
  Star,
  GraduationCap,
  Trash2,
  UploadCloud,
  Mail,
  Briefcase
} from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  description: string;
  image_url: string;
  rating: number;
  students: number;
  status: string;
}

export default function InstructorsPage() {
  const supabase = createClient();

  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
    description: "",
    rating: 5,
    students: 0,
    image_url: ""
  });

  useEffect(() => {
    fetchInstructors();
  }, []);

  async function fetchInstructors() {
    const { data } = await supabase
      .from("instructors")
      .select("*")
      .order("name", { ascending: true });

    if (data) {
      setInstructors(data);
    }
  }

  async function handleImageUpload(file: File) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Instructors");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dnwl0iqfe/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const result = await res.json();
    if (result.secure_url) {
      setFormData(prev => ({
        ...prev,
        image_url: result.secure_url
      }));
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      email: "",
      role: "",
      bio: "",
      description: "",
      rating: 5,
      students: 0,
      image_url: ""
    });
  }

  async function handleAddInstructor() {
    if (!formData.name || !formData.role || !formData.image_url) return;

    setLoading(true);
    await supabase.from("instructors").insert([{ ...formData }]);
    await fetchInstructors();
    resetForm();
    setIsOpen(false);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await supabase.from("instructors").delete().eq("id", id);
    fetchInstructors();
  }

  const filtered = instructors.filter(
    i =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = useMemo(
    () => instructors.reduce((acc, cur) => acc + (cur.students || 0), 0),
    [instructors]
  );

  const avgRating = useMemo(
    () => {
      if (!instructors.length) return 0;
      return (instructors.reduce((a, b) => a + (b.rating || 0), 0) /
        instructors.length).toFixed(1);
    },
    [instructors]
  );

  return (
    <div className="space-y-8 p-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[32px] border border-border/30 bg-card/25 p-8">
        <div className="absolute left-0 top-0 h-[260px] w-[260px] rounded-full bg-primary/[0.05] blur-[110px]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
              Instructor Management
            </div>
            <h1 className="mt-5 text-5xl font-black">Instructor Dashboard</h1>
            <p className="mt-3 text-foreground/60">
              Manage educators and mentors across the platform.
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="h-12 gap-2 rounded-xl">
                <Plus className="h-4 w-4" />
                Add Instructor
              </Button>
            </DialogTrigger>

            <DialogContent className="border-border/30 bg-background/95 backdrop-blur-2xl sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add Instructor</DialogTitle>
              </DialogHeader>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label className="mb-2">Name</Label>
                  <Input
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label className="mb-2">Email</Label>
                  <Input
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label className="mb-2">Role</Label>
                  <Input
                    value={formData.role}
                    onChange={e =>
                      setFormData({ ...formData, role: e.target.value })}
                  />
                </div>

                <div>
                  <Label className="mb-2">Students</Label>
                  <Input
                    type="number"
                    value={formData.students}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        students: Number(e.target.value)
                      })}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-2">Bio</Label>
                  <Textarea
                    value={formData.bio}
                    onChange={e =>
                      setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-2">Description</Label>
                  <Textarea
                    className="min-h-[140px]"
                    value={formData.description}
                    onChange={e =>
                      setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-2">Instructor Image</Label>
                  <label className="mt-2 flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/[0.04] p-8 transition-all hover:border-primary/60 hover:bg-primary/[0.08]">
                    <UploadCloud className="h-8 w-8 text-primary" />
                    <p>Upload Instructor Photo</p>
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        if (!e.target.files) return;
                        handleImageUpload(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>

                {formData.image_url &&
                  <img
                    src={formData.image_url}
                    className="h-20 w-20 rounded-2xl object-cover border"
                  />}

                <div className="md:col-span-2 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} onClick={handleAddInstructor}>
                    {loading ? "Adding..." : "Add Instructor"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* METRICS */}
      <div className="grid gap-5 md:grid-cols-3">
        <Metric
          icon={<Users />}
          value={instructors.length}
          label="Instructors"
        />
        <Metric
          icon={<GraduationCap />}
          value={totalStudents.toLocaleString()}
          label="Students Reached"
        />
        <Metric icon={<Star />} value={avgRating} label="Average Rating" />
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
        <Input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search instructors"
          className="h-12 rounded-xl pl-11"
        />
      </div>

      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(i =>
          <Card
            key={i.id}
            className="group border-border/30 bg-card/30 transition-all hover:-translate-y-1 hover:border-primary/30"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <img
                  src={i.image_url}
                  className="h-16 w-16 rounded-2xl object-cover"
                />

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
                      <AlertDialogTitle>Delete Instructor?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="hover:bg-primary/10 hover:text-foreground">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(i.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {i.name}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-primary">
                <Briefcase className="h-4 w-4" />
                {i.role}
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-foreground/60">
                <Mail className="h-4 w-4" />
                {i.email}
              </div>

              <p className="mt-4 line-clamp-3 text-sm text-foreground/60">
                {i.bio}
              </p>

              <div className="mt-5 flex justify-between border-t pt-4">
                <div>
                  <p className="text-xs text-foreground/40">Students</p>
                  <p className="font-bold">
                    {i.students}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-foreground/40">Rating</p>
                  <p className="font-bold">
                    ⭐ {i.rating}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function Metric({ icon, value, label }: any) {
  return (
    <Card className="border-border/30 bg-card/30">
      <CardContent className="p-6">
        <div className="mb-4 text-primary">
          {icon}
        </div>
        <h2 className="text-4xl font-black">
          {value}
        </h2>
        <p className="text-foreground/60">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}
