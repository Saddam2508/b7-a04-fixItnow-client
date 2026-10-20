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

  return payload.role.toLowerCase();
};

export const getUserRole2 = (accessToken: string): string | null => {
  try {
    const payload = decodeJwt(accessToken);

    if (typeof payload.role !== "string") {
      return null;
    }

    return payload.role.toLowerCase();
  } catch {
    return null;
  }
};
