"use client";

import { useEffect, useState } from "react";
import {
  getTechnicianProfileAction,
  updateTechnicianProfileAction,
} from "@/lib/actions/technician";
import type {
  TechnicianProfile,
  TechnicianProfileInput,
} from "@/components/technician/profile/profileTypes";
import ProfileForm from "./ProfileForm";
import { toast } from "@/components/ui/toast";
import { Loader2, UserRound } from "lucide-react";

const TechnicianProfile = () => {
  const [profile, setProfile] = useState<TechnicianProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const result = await getTechnicianProfileAction();

        if (!result?.success) {
          throw new Error(result?.message || "Profile load failed");
        }

        const responseData = result.data as {
          technicians?: TechnicianProfile[];
        };

        const technician = responseData.technicians?.[0];

        if (!technician) {
          throw new Error("Technician profile not found");
        }

        if (active) {
          setProfile(technician);
        }
      } catch (error) {
        if (active) {
          toast.add({
            title: "Error",
            description:
              error instanceof Error ? error.message : "Failed to load profile",
            type: "error",
          });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      active = false;
    };
  }, []);

  const handleUpdate = async (formData: TechnicianProfileInput) => {
    if (!profile) {
      toast.add({
        title: "Error",
        description: "Profile update failed",
        type: "error",
      });
      return;
    }

    setUpdating(true);

    try {
      const result = await updateTechnicianProfileAction(profile.id, formData);

      if (!result?.success) {
        throw new Error(result?.message || "Profile update failed");
      }
      if (result?.success) {
        toast.add({
          title: "Success",
          description: result.message,
          type: "success",
        });
      }

      // Update-এর পরে latest profile fetch করো।
      const updatedResult = await getTechnicianProfileAction();

      if (!updatedResult?.success) {
        throw new Error(updatedResult?.message || "Profile refresh failed");
      }

      const responseData = updatedResult.data as {
        technicians?: TechnicianProfile[];
      };

      const updatedProfile = responseData.technicians?.[0];

      if (!updatedProfile) {
        throw new Error("Updated profile not found");
      }

      setProfile(updatedProfile);

      if (result?.success) {
        toast.add({
          title: "Success",
          description: result.message || "Profile updated successfully!",
          type: "success",
        });
      }
    } catch (error) {
      toast.add({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        type: "error",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center">
        <UserRound className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Profile not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Unable to load your technician profile.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal and professional information.
        </p>
      </div>

      <ProfileForm
        key={profile.id}
        profile={profile}
        onSubmit={handleUpdate}
        updating={updating}
      />
    </div>
  );
};

export default TechnicianProfile;
