import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { IUserSession, Role } from "@/components/user/userTypes";

import { protectedFetch } from "../core/server";
import { parseUserSession } from "../helper/parseUserSession";

// ------------------------------------
// Get Access Token
// ------------------------------------

export const getUserToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value ?? null;
};

export const getUserSession = async (): Promise<IUserSession | null> => {
  const token = await getUserToken();

  if (!token) {
    return null;
  }
  const result = await protectedFetch("/api/auth/me");

  return parseUserSession(result);
};

// ------------------------------------
// Require Authentication
// ------------------------------------

export const requireAuth = async (): Promise<IUserSession> => {
  const user = await getUserSession();

  if (!user) {
    redirect("/auth/signin");
  }

  return user;
};

// ------------------------------------
// Require Specific Role
// ------------------------------------

export const requireRole = async (role: Role): Promise<IUserSession> => {
  const user = await requireAuth();

  if (user.role !== role) {
    redirect("/unauthorized");
  }

  return user;
};
