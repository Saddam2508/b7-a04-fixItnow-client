export type Role = "admin" | "user";

export interface IUser {
  name: string;
  email: string;
  mobile: number;
  role: Role;
  hourlyRate: number;
}
