import { IUser } from "@/components/user/userTypes";
import { serverMutation } from "../core/server";

export const registerUser = async (newUser: IUser) => {
  return serverMutation("/api/auth/register", newUser);
};

export const loginUser = async (newUser: IUser) => {
  return serverMutation("/api/auth/login", newUser);
};
