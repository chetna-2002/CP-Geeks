"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import {
  Plus,
  Edit2,
  Trash2,
  Search,
  BookOpen,
  Sparkles,
  IndianRupee,
  Users,
  Layers3,
  Clock3
} from "lucide-react";

export default function CoursesPage() {
  const supabase = createClient();

  const [courses, setCourses] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  // FORM STATES
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [cohortType, setCohortType] = useState("");
  const [language, setLanguage] = useState("English");

  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [instructor, setInstructor] = useState("");

  const [whatYouLearn, setWhatYouLearn] = useState("");
  const [features, setFeatures] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [requirements, setRequirements] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
  }, []);

  const fetchCourses = async () => {
    const { data } = await supabase
      .from("courses")
      .select(
        `
        *,
        instructors (
          id,
          name,
          role
        )
      `
      )
      .order("created_at", { ascending: false });

    setCourses(data || []);
  };

  const fetchInstructors = async () => {
    const { data } = await supabase
      .from("instructors")
      .select("*")
      .order("created_at", { ascending: false });

    setInstructors(data || []);
  };

  const resetForm = () => {
    setEditingId(null);

    setTitle("");
    setTagline("");
    setDescription("");

    setPrice("");

    setDuration("");
    setCategory("");
    setLevel("");
    setCohortType("");
    setLanguage("English");

    setThumbnailUrl("");

    setInstructor("");

    setWhatYouLearn("");
    setFeatures("");
    setRoadmap("");
    setRequirements("");
  };

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const parseLines = (text: string) =>
    text
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSaveCourse = async () => {
    const payload = {
      title,
      tagline,
      description,

      price: Number(price),

      duration,
      category,
      level,

      cohort_type: cohortType,

      language,

      thumbnail_url: thumbnailUrl,

      instructor_id: instructor || null,

      slug: slugify(title),

      what_you_learn: parseLines(whatYouLearn),

      features: parseLines(features),

      roadmap: parseLines(roadmap),

      requirements: parseLines(requirements)
    };

    if (editingId) {
      await supabase.from("courses").update(payload).eq("id", editingId);
    } else {
      await supabase.from("courses").insert(payload);
    }

    resetForm();

    setIsOpen(false);

    fetchCourses();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("courses").delete().eq("id", id);

    fetchCourses();
  };

  const filteredCourses = courses.filter((course) =>
    (course.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const COURSE_CATEGORIES = [
  {
    value: "dsa",
    label: "DSA"
  },

  {
    value: "web",
    label: "Web Development"
  },

  {
    value: "system-design",
    label: "System Design"
  },

  {
    value: "data-science",
    label: "Data Science"
  },

  {
    value: "cloud",
    label: "Cloud"
  },

  {
    value: "mobile",
    label: "Mobile"
  },

  {
    value: "ai",
    label: "Artificial Intelligence"
  }
];

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/30 px-6 py-10 md:px-8 md:py-12">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/4 top-0 h-[320px] w-[320px] rounded-full bg-primary/[0.05] blur-[120px]" />

          <div className="absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-primary/[0.03] blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}
          />
        </div>

        <div className="relative z-10">
          {/* TOP */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Course Management
              </div>

              <h1 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-foreground">
                Courses Dashboard
              </h1>

              <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65">
                Manage platform courses, instructors, metadata, pricing, and
                learning structures.
              </p>
            </div>

            {/* RIGHT */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  className="rounded-xl px-5 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105"
                  onClick={resetForm}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Course
                </Button>
              </DialogTrigger>

              {/* MODAL */}
              <DialogContent className="border-border/40 bg-card/95 p-0 backdrop-blur-2xl sm:max-w-7xl">
                <div className="flex h-[88vh] flex-col overflow-hidden">
                  {/* HEADER */}
                  <div className="border-b border-border/30 px-7 py-5">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-black tracking-tight">
                        {editingId ? "Edit Course" : "Create Course"}
                      </DialogTitle>

                      <p className="mt-2 text-sm text-foreground/60">
                        Manage course structure, roadmap, metadata, and learning
                        content.
                      </p>
                    </DialogHeader>
                  </div>

                  {/* MAIN */}
                  <div className="grid min-h-0 flex-1 lg:grid-cols-[420px_1fr]">
                    {/* LEFT PANEL */}
                    <div className="overflow-y-auto border-r border-border/30 p-6">
                      <div className="space-y-6">
                        {/* BASIC */}
                        <div className="rounded-2xl border border-border/30 bg-background/30 p-5">
                          <h3 className="text-lg font-black">
                            Basic Information
                          </h3>

                          <div className="mt-5 space-y-4">
                            <div className="space-y-2">
                              <Label>Course Title</Label>

                              <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border-border/30 bg-background/50"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Tagline</Label>

                              <Input
                                value={tagline}
                                onChange={(e) => setTagline(e.target.value)}
                                placeholder="Short course pitch"
                                className="border-border/30 bg-background/50"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Description</Label>

                              <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="
                    min-h-[180px]
                    resize-none
                    rounded-xl
                    border-border/40
                    bg-background/70
                    shadow-inner
                    shadow-black/20
                  "
                              />
                            </div>
                          </div>
                        </div>

                        {/* METADATA */}
                        <div className="rounded-2xl border border-border/30 bg-background/30 p-5">
                          <h3 className="text-lg font-black">Metadata</h3>

                          <div className="mt-5 grid gap-4">
                            <div className="space-y-2">
                              <Label>Price</Label>

                              <Input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="border-border/30 bg-background/50"
                              />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                <Label>Duration</Label>

                                <Input
                                  value={duration}
                                  onChange={(e) => setDuration(e.target.value)}
                                  className="border-border/30 bg-background/50"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Level</Label>

                                <Input
                                  value={level}
                                  onChange={(e) => setLevel(e.target.value)}
                                  className="border-border/30 bg-background/50"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">

  <Label>

    Category

  </Label>

  <Select
    value={category}
    onValueChange={setCategory}
  >

    <SelectTrigger
      className="
        border-border/30
        bg-background/50
      "
    >

      <SelectValue
        placeholder="Select category"
      />

    </SelectTrigger>

    <SelectContent>

      {COURSE_CATEGORIES.map((item) => (

        <SelectItem
          key={item.value}
          value={item.value}
        >

          {item.label}

        </SelectItem>

      ))}

    </SelectContent>

  </Select>

</div>

                            <div className="space-y-2">
                              <Label>Instructor</Label>

                              <Select
                                value={instructor || undefined}
                                onValueChange={setInstructor}
                              >
                                <SelectTrigger className="border-border/30 bg-background/50">
                                  <SelectValue placeholder="Select instructor" />
                                </SelectTrigger>

                                <SelectContent>
                                  {instructors.map((i) => (
                                    <SelectItem key={i.id} value={i.id}>
                                      {i.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                <Label>Cohort Type</Label>

                                <Input
                                  value={cohortType}
                                  onChange={(e) =>
                                    setCohortType(e.target.value)
                                  }
                                  className="border-border/30 bg-background/50"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Language</Label>

                                <Input
                                  value={language}
                                  onChange={(e) => setLanguage(e.target.value)}
                                  className="border-border/30 bg-background/50"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="flex min-h-0 flex-col">
                      <div className="border-b border-border/30 px-6 py-4">
                        <h3 className="text-xl font-black">
                          Course Content Structure
                        </h3>

                        <p className="mt-1 text-sm text-foreground/55">
                          One item per line for structured parsing.
                        </p>
                      </div>

                      <div className="grid flex-1 gap-5 overflow-y-auto p-6 xl:grid-cols-2">
                        {[
                          {
                            title: "What You Will Learn",
                            value: whatYouLearn,
                            setter: setWhatYouLearn
                          },

                          {
                            title: "Features",
                            value: features,
                            setter: setFeatures
                          },

                          {
                            title: "Roadmap",
                            value: roadmap,
                            setter: setRoadmap
                          },

                          {
                            title: "Requirements",
                            value: requirements,
                            setter: setRequirements
                          }
                        ].map((section, i) => (
                          <div
                            key={i}
                            className="flex min-h-[280px] flex-col rounded-2xl border border-border/30 bg-background/30 p-5"
                          >
                            <h3 className="text-lg font-black">
                              {section.title}
                            </h3>

                            <p className="mt-1 text-xs text-foreground/50">
                              One entry per line
                            </p>

                            <Textarea
                              value={section.value}
                              onChange={(e) => section.setter(e.target.value)}
                              className="mt-5 flex-1 resize-none rounded-xl border-border/40 bg-background/70 text-foreground shadow-inner shadow-black/20 focus-visible:ring-1 focus-visible:ring-primary/40"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-end gap-3 border-t border-border/30 bg-card px-7 py-5">
                    <Button
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                      className="border-border/30 bg-background/40 text-foreground transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={handleSaveCourse}
                      className="shadow-lg shadow-primary/20"
                    >
                      {editingId ? "Update Course" : "Create Course"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* SEARCH */}
          <div className="mt-10 max-w-xl">
            <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-300 focus-within:border-primary/30 focus-within:shadow-xl focus-within:shadow-primary/5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />

              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />

              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="relative z-10 h-12 border-0 bg-transparent pl-14 text-base shadow-none focus-visible:ring-0"
              />
            </div>
          </div>

          {/* STATS */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-[26px] border border-border/40 bg-card/50 p-6 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-4xl font-black text-foreground">
                {courses.length}
              </h2>

              <p className="mt-2 text-sm text-foreground/55">Total Courses</p>
            </div>

            <div className="rounded-[26px] border border-border/40 bg-card/50 p-6 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-4xl font-black text-foreground">
                {instructors.length}
              </h2>

              <p className="mt-2 text-sm text-foreground/55">
                Active Instructors
              </p>
            </div>

            <div className="rounded-[26px] border border-border/40 bg-card/50 p-6 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <IndianRupee className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-4xl font-black text-foreground">
                ₹
                {courses
                  .reduce((acc, curr) => acc + (curr.price || 0), 0)
                  .toLocaleString()}
              </h2>

              <p className="mt-2 text-sm text-foreground/55">
                Total Course Value
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="px-6 py-8 md:px-8 md:py-10">
        <div className="grid grid-cols-1 gap-5">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group relative overflow-hidden rounded-[28px] border border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
                {/* LEFT */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-2xl font-black text-foreground transition-colors group-hover:text-primary">
                        {course.title}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-primary">
                        {course.instructors?.name || "No Instructor"}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-2 max-w-3xl text-sm leading-relaxed text-foreground/65">
                    {course.description}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 px-5 py-3 text-primary">
                    <p className="text-xs uppercase tracking-wide text-primary/70">
                      Price
                    </p>

                    <h3 className="mt-1 text-2xl font-black">
                      ₹{course.price?.toLocaleString()}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* EDIT */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-border/30 bg-background/40 text-foreground transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                      onClick={() => {
                        setEditingId(course.id);

                        setTitle(course.title || "");
                        setTagline(course.tagline || "");
                        setDescription(course.description || "");

                        setPrice(String(course.price || ""));

                        setDuration(course.duration || "");
                        setCategory(course.category || "");
                        setLevel(course.level || "");
                        setCohortType(course.cohort_type || "");
                        setLanguage(course.language || "English");

                        setThumbnailUrl(course.thumbnail_url || "");

                        setInstructor(course.instructor_id || "");

                        setWhatYouLearn(
                          (course.what_you_learn || []).join("\n")
                        );

                        setFeatures((course.features || []).join("\n"));

                        setRoadmap((course.roadmap || []).join("\n"));

                        setRequirements((course.requirements || []).join("\n"));

                        setIsOpen(true);
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>

                    {/* DELETE */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-border/30 bg-background/40 hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="border-border/40 bg-card/95 backdrop-blur-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete course?</AlertDialogTitle>

                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction
                            onClick={() => handleDelete(course.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* EMPTY */}
          {filteredCourses.length === 0 && (
            <div className="rounded-[28px] border border-border/40 bg-card/50 p-12 text-center backdrop-blur-xl">
              <h3 className="text-2xl font-black text-foreground">
                No Courses Found
              </h3>

              <p className="mt-3 text-foreground/60">
                Try searching with different keywords.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
