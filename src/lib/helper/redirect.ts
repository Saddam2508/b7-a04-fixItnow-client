import { redirect } from "next/navigation";

const ROLE_ROUTES: Record<string, string> = {
  customer: "/dashboard/customer",
  technician: "/dashboard/technician",
  admin: "/dashboard/admin",
};

export const redirectByRole = (role: string): never => {
  redirect(ROLE_ROUTES[role] ?? "/unauthorized");
};
