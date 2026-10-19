"use server";

import { IUser, LoginResult } from "@/components/user/userTypes";
import { serverMutation } from "../core/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const registerUser = async (newUser: IUser) => {
  return serverMutation("/api/auth/register", newUser);
};

export const loginUser = async (
  _previousState: LoginResult,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  const user: IUser = { email, password };

  const result = await serverMutation("/api/auth/login", user);

  if (!result?.success || !result.data?.accessToken) {
    return result;
  }

  const cookieStore = await cookies();

  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  const payload = result.data.accessToken.split(".")[1];

  if (!payload) {
    return {
      ...result,
      success: false,
      message: "Invalid access token",
    };
  }

  const decodedPayload: unknown = JSON.parse(
    Buffer.from(payload, "base64url").toString("utf8"),
  );

  if (
    typeof decodedPayload !== "object" ||
    decodedPayload === null ||
    !("role" in decodedPayload) ||
    typeof decodedPayload.role !== "string"
  ) {
    return {
      ...result,
      success: false,
      message: "User role not found",
    };
  }

  const role = decodedPayload.role.toLowerCase();

  switch (role) {
    case "customer":
      redirect("/dashboard/customer");

    case "technician":
      redirect("/dashboard/technician");

    case "admin":
      redirect("/dashboard/admin");

    default:
      redirect("/unauthorized");
  }
};
