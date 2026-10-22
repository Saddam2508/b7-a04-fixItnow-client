export type Role = "ADMIN" | "CUSTOMER" | "TECHNICIAN";

export interface IUser {
  id?: string;
  name?: string;
  email: string;
  password: string;
  mobile?: number;
  role?: Role;
  hourlyRate?: number;
  image?: string;
}

export type IUserSession = Omit<IUser, "password">;

export type LoginState = {
  success: boolean;
  message: string;
};

export type LoginResult = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};
