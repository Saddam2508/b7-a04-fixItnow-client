"use client";

import { useState } from "react";
import Image from "next/image";

import type {
  CustomerProfileData,
  CustomerProfileInput,
} from "./customerProfileTypes";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Loader2, Save, UserRound } from "lucide-react";

interface CustomerProfileFormProps {
  profile: CustomerProfileData;
  onSubmit: (data: CustomerProfileInput) => Promise<void>;
  updating: boolean;
}

const CustomerProfileForm = ({
  profile,
  onSubmit,
  updating,
}: CustomerProfileFormProps) => {
  const [formData, setFormData] = useState<CustomerProfileInput>({
    name: profile.name,
    email: profile.email,
    profilePhoto: profile.profile?.profilePhoto ?? null,
    bio: profile.profile?.bio ?? null,
  });

  const updateField = <K extends keyof CustomerProfileInput>(
    field: K,
    value: CustomerProfileInput[K],
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      profilePhoto: formData.profilePhoto?.trim() || null,
      bio: formData.bio?.trim() || null,
    });
  };

  const profilePhoto = formData.profilePhoto;

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
                <span className="text-3xl font-bold text-muted-foreground">
                  {formData.name.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>

            <div className="w-full space-y-2">
              <p className="font-medium">Profile Picture</p>

              <p className="text-sm text-muted-foreground">
                Enter your profile picture URL.
              </p>

              <Input
                type="url"
                value={formData.profilePhoto ?? ""}
                onChange={(event) =>
                  updateField("profilePhoto", event.target.value || null)
                }
                placeholder="https://example.com/profile.jpg"
              />
            </div>
          </div>

          {/* Name and Email */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Full Name</Label>

              <Input
                id="customer-name"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Enter your full name"
                required
                minLength={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-email">Email Address</Label>

              <Input
                id="customer-email"
                type="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Customer */}
      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
          <p className="text-sm text-muted-foreground">
            Tell technicians a little about yourself.
          </p>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="customer-bio">Bio / Description</Label>

            <Textarea
              id="customer-bio"
              value={formData.bio ?? ""}
              onChange={(event) =>
                updateField("bio", event.target.value || null)
              }
              placeholder="Write something about yourself..."
              rows={5}
            />
          </div>
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

export default CustomerProfileForm;
