"use server";

import { IUser, LoginResult } from "@/components/user/userTypes";
import { serverMutation } from "../core/server";
import { clearAuthCookies, setAuthCookies } from "../helper/cookies";
import { getUserRole2 } from "../helper/jwt";
import { redirectByRole } from "../helper/redirect";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

  const result = await serverMutation("/api/auth/login", {
    email: email.trim(),
    password,
  });

  if (!result?.success || !result.data?.accessToken) {
    return result;
  }

  const { accessToken, refreshToken } = result.data;

  await setAuthCookies(accessToken, refreshToken);
  revalidatePath("/", "layout");

  const role = getUserRole2(accessToken);

  if (!role) {
    return {
      ...result,
      success: false,
      message: "User role not found",
    };
  }

  redirectByRole(role);
};

export async function logoutAction() {
  await clearAuthCookies();
  redirect("/auth/signin");
}
