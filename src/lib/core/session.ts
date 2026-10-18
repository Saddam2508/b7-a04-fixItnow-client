import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { IUserSession, Role } from "@/components/user/userTypes";
import { protectedFetch } from "./server";

export const getUserToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value ?? null;
};

export const getUserSession = async (): Promise<IUserSession | null> => {
  const token = await getUserToken();

  if (!token) {
    return null;
  }

  const result: unknown = await protectedFetch("/api/auth/me");

  if (typeof result !== "object" || result === null || !("data" in result)) {
    return null;
  }

  const user = result.data;

  if (
    typeof user !== "object" ||
    user === null ||
    !("id" in user) ||
    !("email" in user) ||
    !("role" in user) ||
    typeof user.id !== "string" ||
    typeof user.email !== "string" ||
    typeof user.role !== "string"
  ) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role as Role,
  };
};

export const requireRole = async (role: Role): Promise<IUserSession> => {
  const user = await getUserSession();

  if (!user) {
    redirect("/auth/signin");
  }

  if (user.role !== role) {
    redirect("/unauthorized");
  }

  return user;
};
