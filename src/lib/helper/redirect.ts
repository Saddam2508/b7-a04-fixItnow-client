import { redirect } from "next/navigation";
import type { Role } from "@/components/user/userTypes";

const ROLE_ROUTES: Record<Role, string> = {
  CUSTOMER: "/dashboard/customer",
  TECHNICIAN: "/dashboard/technician",
  ADMIN: "/dashboard/admin",
};

export const redirectByRole = (role: Role): never => {
  redirect(ROLE_ROUTES[role] ?? "/unauthorized");
};
