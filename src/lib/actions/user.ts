"use server";

import { IUser, LoginResult } from "@/components/user/userTypes";
import { serverMutation } from "../core/server";
import { cookies } from "next/headers";

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
    return { success: false, message: "Email and password are required" };
  }

  const user: IUser = { email, password };

  const result = await serverMutation("/api/auth/login", user);
  const cookieStore = await cookies();
  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });
  return result;
};
