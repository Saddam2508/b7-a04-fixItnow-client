import { Role } from "@/components/user/userTypes";
import { decodeJwt } from "jose";

interface JWTPayload {
  role?: string;
}

export const decodeJWTPayload = (token: string): JWTPayload | null => {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const decoded = Buffer.from(payload, "base64url").toString("utf8");

    return JSON.parse(decoded) as JWTPayload;
  } catch {
    return null;
  }
};

export const getUserRole1 = (accessToken: string): string | null => {
  const payload = decodeJWTPayload(accessToken);

  if (!payload?.role) {
    return null;
  }

  return payload.role;
};

const ROLES: readonly Role[] = ["CUSTOMER", "TECHNICIAN", "ADMIN"];

export const getUserRole2 = (token: string): Role | null => {
  try {
    const payload = decodeJwt(token);
    const role = payload.role;

    if (typeof role !== "string") {
      return null;
    }

    return ROLES.find((item) => item === role) ?? null;
  } catch {
    return null;
  }
};
