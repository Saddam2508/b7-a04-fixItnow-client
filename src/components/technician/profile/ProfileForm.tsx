"use client";

import { useState } from "react";
import Image from "next/image";

import type {
  TechnicianProfileFormData,
  TechnicianProfileInput,
  TechnicianAvailabilityInput,
} from "@/components/technician/profile/profileTypes";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { Loader2, Plus, Save, X, CalendarDays } from "lucide-react";

interface ProfileFormProps {
  profile: TechnicianProfileFormData;
  onSubmit: (data: TechnicianProfileInput) => Promise<void>;
  updating: boolean;
}

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ProfileForm = ({ profile, onSubmit, updating }: ProfileFormProps) => {
  const [formData, setFormData] = useState<TechnicianProfileFormData>({
    ...profile,
    skills: profile.skills ?? [],
    availability: profile.availability ?? [],
  });

  const [skillInput, setSkillInput] = useState("");

  // Update any profile field
  const updateField = <K extends keyof TechnicianProfileFormData>(
    field: K,
    value: TechnicianProfileFormData[K],
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Add skill
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

  // Remove skill
  const removeSkill = (skill: string) => {
    updateField(
      "skills",
      formData.skills.filter((item) => item !== skill),
    );
  };

  // Add availability
  const addAvailability = () => {
    const newAvailability: TechnicianAvailabilityInput = {
      dayOfWeek: 0,
      startTime: "09:00",
      endTime: "17:00",
    };

    updateField("availability", [...formData.availability, newAvailability]);
  };

  // Update availability field
  const updateAvailability = (
    index: number,
    field: keyof TechnicianAvailabilityInput,
    value: string | number,
  ) => {
    const updatedAvailability = [...formData.availability];

    updatedAvailability[index] = {
      ...updatedAvailability[index],
      [field]: value,
    };

    updateField("availability", updatedAvailability);
  };

  // Remove availability
  const removeAvailability = (index: number) => {
    updateField(
      "availability",
      formData.availability.filter(
        (_, availabilityIndex) => availabilityIndex !== index,
      ),
    );
  };

  // Submit profile
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const availability: TechnicianAvailabilityInput[] =
      formData.availability.map((item) => ({
        ...(item.id ? { id: item.id } : {}),
        dayOfWeek: item.dayOfWeek,
        startTime: item.startTime,
        endTime: item.endTime,
      }));

    await onSubmit({
      bio: formData.bio,
      skills: formData.skills,
      experience: Number(formData.experience),
      hourlyRate: Number(formData.hourlyRate),
      location: formData.location,
      availability,
    });
  };

  const profilePhoto = formData.user.profile?.profilePhoto;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
              {profilePhoto ? (
                <Image
                  src={profilePhoto}
                  alt="Profile picture"
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

            <div className="space-y-1 text-center sm:text-left">
              <p className="font-medium">Profile Picture</p>

              <p className="text-sm text-muted-foreground">
                Your current profile picture.
              </p>
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>

              <Input
                value={formData.user.name}
                disabled
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>

              <Input value={formData.user.email} disabled type="email" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Phone Number</Label>

              <Input
                value={formData.user.phone ?? ""}
                disabled
                placeholder="Your phone number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Skills */}
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
                aria-label="Add skill"
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

            {formData.skills.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No skills added yet.
              </p>
            )}
          </div>

          {/* Experience, Hourly Rate, Location */}
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

          {/* Bio */}
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

      {/* Availability Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />

            <CardTitle>Availability Schedule</CardTitle>
          </div>

          <p className="text-sm text-muted-foreground">
            Manage the days and hours when customers can book your services.
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          {formData.availability.length > 0 ? (
            <div className="space-y-4">
              {formData.availability.map((item, index) => (
                <div
                  key={item.id ?? `availability-${index}`}
                  className="grid gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {/* Day */}
                  <div className="space-y-2">
                    <Label>Day</Label>

                    <select
                      value={item.dayOfWeek}
                      onChange={(event) =>
                        updateAvailability(
                          index,
                          "dayOfWeek",
                          Number(event.target.value),
                        )
                      }
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                      {DAYS_OF_WEEK.map((day, dayIndex) => (
                        <option key={dayIndex} value={dayIndex}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Start Time */}
                  <div className="space-y-2">
                    <Label>Start Time</Label>

                    <Input
                      type="time"
                      value={item.startTime}
                      onChange={(event) =>
                        updateAvailability(
                          index,
                          "startTime",
                          event.target.value,
                        )
                      }
                      required
                    />
                  </div>

                  {/* End Time */}
                  <div className="space-y-2">
                    <Label>End Time</Label>

                    <Input
                      type="time"
                      value={item.endTime}
                      onChange={(event) =>
                        updateAvailability(index, "endTime", event.target.value)
                      }
                      min={item.startTime}
                      required
                    />
                  </div>

                  {/* Remove */}
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full text-destructive hover:text-destructive"
                      onClick={() => removeAvailability(index)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed p-6 text-center">
              <CalendarDays className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

              <p className="font-medium">No availability schedule</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Add your working days and hours.
              </p>
            </div>
          )}

          {/* Add Availability */}
          <Button type="button" variant="outline" onClick={addAvailability}>
            <Plus className="mr-2 h-4 w-4" />
            Add Availability
          </Button>
        </CardContent>
      </Card>

      {/* Submit */}
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
