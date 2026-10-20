import { IUserSession, Role } from "@/components/user/userTypes";

// ------------------------------------
// Role Helper
// ------------------------------------

const ROLES: readonly Role[] = ["customer", "technician", "admin"];

const isRole = (value: unknown): value is Role => {
  return (
    typeof value === "string" && ROLES.includes(value.toLowerCase() as Role)
  );
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
    !("email" in profile) ||
    !("role" in profile)
  ) {
    return null;
  }

  const { id, email, role } = profile;

  if (
    typeof id !== "string" ||
    typeof email !== "string" ||
    typeof role !== "string"
  ) {
    return null;
  }

  const normalizedRole = role.toLowerCase();

  if (!isRole(normalizedRole)) {
    return null;
  }

  return {
    id,
    email,
    role: normalizedRole,
  };
};
