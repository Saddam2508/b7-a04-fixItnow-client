export type Role = "admin" | "customer" | "technician";

export interface IUser {
  id?: string;
  name?: string;
  email: string;
  password: string;
  mobile?: number;
  role?: Role;
  hourlyRate?: number;
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
