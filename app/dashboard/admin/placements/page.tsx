"use client";

import { useEffect, useState } from "react";
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

import {
  Plus,
  Search,
  Trash2,
  Edit2,
  Users,
  Building2,
  Trophy,
  UploadCloud
} from "lucide-react";

interface Placement {
  id: string;

  name: string;

  company: string;

  role: string;

  image_url: string;
}

export default function PlacementsPage() {
  const supabase = createClient();

  const [placements, setPlacements] = useState<Placement[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",

    company: "",

    role: "",

    image_url: ""
  });

  useEffect(() => {
    fetchPlacements();
  }, []);

  async function fetchPlacements() {
    const { data, error } = await supabase

      .from("placements")

      .select("*")

      .order(
        "name",

        {
          ascending: true
        }
      );

    if (!error) {
      setPlacements(data || []);
    }
  }

  function resetForm() {
    setEditingId(null);

    setFormData({
      name: "",

      company: "",

      role: "",

      image_url: ""
    });
  }

  function openCreateDialog() {
    resetForm();

    setIsOpen(true);
  }

  function closeDialog() {
    resetForm();

    setIsOpen(false);
  }

  async function handleSave() {
    setLoading(true);

    const payload = {
      name: formData.name,

      company: formData.company,

      role: formData.role,

      image_url: formData.image_url
    };

    if (editingId) {
      await supabase

        .from("placements")

        .update(payload)

        .eq(
          "id",

          editingId
        );
    } else {
      await supabase

        .from("placements")

        .insert(payload);
    }

    await fetchPlacements();

    closeDialog();

    setLoading(false);
  }

  async function handleDelete(id: string) {
    await supabase

      .from("placements")

      .delete()

      .eq(
        "id",

        id
      );

    fetchPlacements();
  }

  async function handleUpload(file: File) {
    const fd = new FormData();

    fd.append("file", file);

    fd.append("upload_preset", "Placements");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dnwl0iqfe/image/upload",

      {
        method: "POST",

        body: fd
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      setFormData((prev) => ({
        ...prev,

        image_url: data.secure_url
      }));
    }
  }

  const filtered = placements.filter(
    (p) =>
      p.name

        .toLowerCase()

        .includes(searchTerm.toLowerCase()) ||
      p.company

        .toLowerCase()

        .includes(searchTerm.toLowerCase())
  );

  const companies = new Set(placements.map((p) => p.company)).size;

  return (
    <div className="space-y-8 p-8">
      <section
        className="relative overflow-hidden rounded-[32px] border border-border/30 bg-card/25 p-8">
       <div className="absolute left-0 top-0 h-[240px] w-[240px] rounded-full bg-primary/[0.05] blur-[110px]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
              Placement Management
            </div>
            <h1 className="mt-5 text-5xl font-black">
              Placements Dashboard
            </h1>
            <p className="mt-3 text-foreground/60">
              Manage placement achievements.
            </p>
          </div>

          <Dialog
            open={isOpen}
            onOpenChange={(open) => {
              if (!open) {
                closeDialog();
              } else {
                setIsOpen(true);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog} className="h-12 gap-2 rounded-xl">
                <Plus className="h-4 w-4"/>
                Add Placement
              </Button>
            </DialogTrigger>

            <DialogContent className="border-border/30 bg-background/95 backdrop-blur-2xl sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Placement" : "Add Placement"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5">
                <div>
                  <Label className="mb-2">Student Name</Label>

                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,

                        name: e.target.value
                      })
                    }
                  />
                </div>

                <div>
                  <Label className="mb-2">Company</Label>

                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({
                        ...formData,

                        company: e.target.value
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Student Photo</Label>

                  <label className="mt-2 flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/[0.04] p-8 transition-all hover:border-primary/60 hover:bg-primary/[0.08]">
                    <UploadCloud className="h-8 w-8 text-primary" />

                    <p>Choose Image</p>

                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (!e.target.files) return;

                        handleUpload(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>

                {formData.image_url && (
                  <img src={formData.image_url} className="h-24 w-24 rounded-2xl border object-cover" />
                )}

               <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={closeDialog} className="hover:border-primary/30 hover:bg-primary/10 hover:text-foreground">
                    Cancel
                  </Button>

                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Saving..." : editingId ? "Update" : "Create"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard
          icon={<Users />}
          value={placements.length}
          label="Placements"
        />

        <StatCard icon={<Building2 />} value={companies} label="Companies" />

        <StatCard icon={<Trophy />} value={filtered.length} label="Visible" />
      </div>

      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40"/>

        <Input
          placeholder="Search placements"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-12 rounded-xl pl-11"/>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <Card key={p.id} className="border-border/30 bg-card/30 transition-all hover:-translate-y-1 hover:border-primary/30">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <img src={p.image_url} className="h-16 w-16 rounded-2xl object-cover" />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setEditingId(p.id);

                    setFormData({
                      name: p.name,
                      company: p.company,
                      role: p.role,
                      image_url: p.image_url
                    });

                    setIsOpen(true);
                  }}
                  className="border-border/30 bg-background/40 text-foreground transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                  >
                  <Edit2 />
                </Button>
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {p.name}
              </h3>

              <p className="text-primary">
                {p.company}
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-4 w-full hover:text-red-500">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Placement?</AlertDialogTitle>

                    <AlertDialogDescription>
                      Cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction onClick={() => handleDelete(p.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  icon,

  value,

  label
}: any) {
  return (
    <Card className="border-border/30 bg-card/30">
      <CardContent className="p-6">
        <div className=" mb-4 text-primary">
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
