"use client";

import { useEffect, useState } from "react";
import {
  getTechnicianProfileAction,
  updateTechnicianProfileAction,
} from "@/lib/actions/technician";

import type {
  TechnicianProfileFormData,
  TechnicianProfileInput,
} from "@/components/technician/profile/profileTypes";

import ProfileForm from "./ProfileForm";
import { toast } from "@/components/ui/toast";
import { Loader2, UserRound } from "lucide-react";

const TechnicianProfile = () => {
  const [profile, setProfile] = useState<TechnicianProfileFormData | null>(
    null,
  );

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const loadProfile = async () => {
    const result = await getTechnicianProfileAction();

    if (!result?.success) {
      throw new Error(result?.message || "Profile load failed");
    }

    const responseData = result.data as {
      technicians?: TechnicianProfileFormData[];
    };

    const technician = responseData.technicians?.[0];

    if (!technician) {
      throw new Error("Technician profile not found");
    }

    setProfile(technician);
  };

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const result = await getTechnicianProfileAction();

        if (!result?.success) {
          throw new Error(result?.message || "Profile load failed");
        }

        const responseData = result.data as {
          technicians?: TechnicianProfileFormData[];
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

    void load();

    return () => {
      active = false;
    };
  }, []);

  const handleUpdate = async (formData: TechnicianProfileInput) => {
    if (!profile) return;

    setUpdating(true);

    try {
      const result = await updateTechnicianProfileAction(profile.id, formData);

      if (!result?.success) {
        throw new Error(result?.message || "Profile update failed");
      }

      await loadProfile();

      toast.add({
        title: "Success",
        description: result.message || "Profile updated successfully!",
        type: "success",
      });
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
