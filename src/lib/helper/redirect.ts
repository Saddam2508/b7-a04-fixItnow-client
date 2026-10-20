import { redirect } from "next/navigation";
import type { Role } from "@/components/user/userTypes";

const ROLE_ROUTES: Record<Role, string> = {
  customer: "/dashboard/customer",
  technician: "/dashboard/technician",
  admin: "/dashboard/admin",
};

export const redirectByRole = (role: Role): never => {
  redirect(ROLE_ROUTES[role] ?? "/unauthorized");
};
