import { IUserSession, Role } from "@/components/user/userTypes";

// ------------------------------------
// Role Helper
// ------------------------------------

const ROLES: readonly Role[] = ["CUSTOMER", "TECHNICIAN", "ADMIN"];

const isRole = (value: unknown): value is Role => {
  return typeof value === "string" && ROLES.includes(value as Role);
};

export const parseUserSession = (result: unknown): IUserSession | null => {
  if (typeof result !== "object" || result === null || !("data" in result)) {
    return null;
  }

  const data = result.data;

  if (typeof data !== "object" || data === null || !("profile" in data)) {
    return null;
  }

  const profile = data.profile;

  if (
    typeof profile !== "object" ||
    profile === null ||
    !("id" in profile) ||
    !("name" in profile) ||
    !("email" in profile) ||
    !("role" in profile)
  ) {
    return null;
  }

  const { id, name, email, role } = profile;

  if (
    typeof id !== "string" ||
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof role !== "string"
  ) {
    return null;
  }

  if (!isRole(role)) {
    return null;
  }

  return {
    id,
    name,
    email,
    role,
  };
};
