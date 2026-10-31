"use client";

import { useState } from "react";
import Image from "next/image";
import { TechnicianProfile } from "@/types/technician";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Save, X } from "lucide-react";

interface ProfileFormProps {
  profile: TechnicianProfile;
  onSubmit: (data: TechnicianProfile) => Promise<void>;
  updating: boolean;
}

const ProfileForm = ({ profile, onSubmit, updating }: ProfileFormProps) => {
  const [formData, setFormData] = useState<TechnicianProfile>(profile);

  const [skillInput, setSkillInput] = useState("");

  const updateField = <K extends keyof TechnicianProfile>(
    field: K,
    value: TechnicianProfile[K],
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const addSkill = () => {
    const skill = skillInput.trim();

    if (
      !skill ||
      formData.skills.some((item) => item.toLowerCase() === skill.toLowerCase())
    ) {
      return;
    }

    updateField("skills", [...formData.skills, skill]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    updateField(
      "skills",
      formData.skills.filter((item) => item !== skill),
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({
      bio: formData.bio,
      skills: formData.skills,
      experience: Number(formData.experience),
      hourlyRate: Number(formData.hourlyRate),
      location: formData.location,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-muted">
              {formData.user.profile?.profilePhoto ? (
                <Image
                  src={formData.user.profile.profilePhoto}
                  alt="Profile"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <span className="text-3xl font-bold">
                  {formData.user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <p className="font-medium">Profile Picture</p>
              <p className="text-sm text-muted-foreground">
                Your current profile picture.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={formData.user.name}
                onChange={(event) =>
                  updateField("user", {
                    ...formData.user,
                    name: event.target.value,
                  })
                }
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input value={formData.user.email} disabled type="email" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Profile Picture URL</Label>
              <Input
                value={formData.user.profile?.profilePhoto ?? ""}
                onChange={(event) =>
                  updateField("user", {
                    ...formData.user,
                    profile: {
                      id: formData.user.profile?.id ?? "",
                      profilePhoto: event.target.value,
                    },
                  })
                }
                placeholder="https://example.com/profile.jpg"
              />
              <p className="text-xs text-muted-foreground">
                Enter an image URL. Upload support depends on your backend.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Skills</Label>

            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(event) => setSkillInput(event.target.value)}
                placeholder="e.g. Electrical Repair"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill();
                  }
                }}
              />

              <Button
                type="button"
                onClick={addSkill}
                size="icon"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {formData.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="gap-2 px-3 py-1.5"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Experience (Years)</Label>
              <Input
                type="number"
                min={0}
                value={formData.experience}
                onChange={(event) =>
                  updateField(
                    "experience",
                    Math.max(0, Number(event.target.value)),
                  )
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Hourly Rate</Label>
              <Input
                type="number"
                min={0}
                value={formData.hourlyRate}
                onChange={(event) =>
                  updateField(
                    "hourlyRate",
                    Math.max(0, Number(event.target.value)),
                  )
                }
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Location</Label>
              <Input
                value={formData.location ?? ""}
                onChange={(event) =>
                  updateField("location", event.target.value)
                }
                placeholder="Enter your location"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bio / Description</Label>
            <Textarea
              value={formData.bio ?? ""}
              onChange={(event) => updateField("bio", event.target.value)}
              placeholder="Tell customers about your experience and services..."
              rows={5}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={updating}>
          {updating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Update Profile
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
