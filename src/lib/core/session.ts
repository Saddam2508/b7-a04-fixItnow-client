import { redirect } from "next/navigation";

import type { IUser, Role } from "@/components/user/userTypes";

export const getUserSession = (): IUser | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as IUser;
  } catch {
    return null;
  }
};

export const getUserToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
};

export const requireRole = (role: Role): IUser => {
  const user = getUserSession();

  if (!user) {
    redirect("/auth/signin");
  }

  if (user.role !== role) {
    redirect("/unauthorized");
  }

  return user;
};
