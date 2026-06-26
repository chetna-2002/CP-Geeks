"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Save } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function ProfilePage() {
  const supabase = createClient();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Holds the actual data saved on the server
  const [initialData, setInitialData] = useState({
    full_name: "",
    email: "",
    phone: "",
    linkedin: ""
  });

  // Holds the temporary edits while typing
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    linkedin: ""
  });

  // 🔹 Fetch user + profile
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error && profile) {
        const data = {
          full_name: profile.full_name ?? "",
          email: user.email ?? "",
          phone: profile.phone ?? "",
          linkedin: profile.linkedin ?? ""
        };
        setInitialData(data);
        setFormData(data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  // 🔹 Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle Cancel Click
  const handleCancel = () => {
    setFormData(initialData); // Revert back to original data
    setIsEditing(false);
  };

  // 🔹 Save profile
  const handleSave = async () => {
    // 1. Validation: Prevent empty name
    if (!formData.full_name.trim()) {
      alert("Full name cannot be empty");
      return;
    }

    setLoading(true);

    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)) {
      alert("Please enter a valid 10 digit phone number");
      setLoading(false);
      return;
    }

    if (formData.linkedin && !formData.linkedin.includes("linkedin.com")) {
      alert("Please enter a valid LinkedIn URL");
      setLoading(false);
      return;
    }

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name.trim(), // Save trimmed name
        phone: formData.phone,
        linkedin: formData.linkedin
      })
      .eq("id", user.id);

    if (!error) {
      setInitialData(formData); // Sync initialData with new changes on success
      setIsEditing(false);
    } else {
      alert("Failed to update profile. Please try again.");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/60">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/30 py-8">
        <div className="mx-auto max-w-4xl px-4">
          <Link href="/dashboard/user">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-foreground/60 mt-2">
            Manage your personal and professional information
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 space-y-8">
          {/* Personal Info */}
          <Card className="rounded-3xl border-border/50 shadow-lg">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic user details</CardDescription>
              </div>
              <Button
                onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                variant={isEditing ? "destructive" : "default"}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-5">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-[0.5rem] bg-background text-foreground border border-border"
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input value={formData.email} disabled className="mt-[0.5rem] bg-background text-foreground border border-border" />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-[0.5rem] bg-background text-foreground border border-border"
                  />
                </div>

                <div>
                  <Label>LinkedIn Profile</Label>
                  <Input
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="mt-[0.5rem] bg-background text-foreground border border-border"
                  />
                </div>
              </div>
              {isEditing && (
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}