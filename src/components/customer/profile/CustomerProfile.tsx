"use client";

import { useEffect, useState } from "react";

import { getMyProfileAction, updateMyProfileAction } from "@/lib/actions/user";

import type {
  CustomerProfileData,
  CustomerProfileInput,
  CustomerProfileApiResponse,
  MyProfileResponse,
  UpdatedProfileResponse,
} from "./customerProfileTypes";

import CustomerProfileForm from "./CustomerProfileForm";

import { toast } from "@/components/ui/toast";
import { Loader2, UserRound } from "lucide-react";

const CustomerProfile = () => {
  const [profile, setProfile] = useState<CustomerProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const result =
          (await getMyProfileAction()) as CustomerProfileApiResponse<MyProfileResponse>;

        if (!result?.success || !result.data?.profile) {
          throw new Error(result?.message || "Profile load failed");
        }

        if (active) {
          setProfile(result.data.profile);
        }
      } catch (error) {
        if (active) {
          toast.add({
            title: "Error",
            description:
              error instanceof Error
                ? error.message
                : "Failed to load customer profile",
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

  const handleUpdate = async (formData: CustomerProfileInput) => {
    if (!profile) return;

    setUpdating(true);

    try {
      const result = (await updateMyProfileAction(
        formData,
      )) as CustomerProfileApiResponse<UpdatedProfileResponse>;

      if (!result?.success || !result.data?.updatedProfile) {
        throw new Error(result?.message || "Profile update failed");
      }

      setProfile(result.data.updatedProfile);

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
          Unable to load your customer profile.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal information and account details.
        </p>
      </div>

      <CustomerProfileForm
        key={`${profile.id}-${profile.updatedAt}`}
        profile={profile}
        onSubmit={handleUpdate}
        updating={updating}
      />
    </div>
  );
};

export default CustomerProfile;
