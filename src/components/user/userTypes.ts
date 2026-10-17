export type Role = "admin" | "user";

export interface IUser {
  name?: string;
  email: string;
  password: string;
  mobile?: number;
  role?: Role;
  hourlyRate?: number;
}

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
