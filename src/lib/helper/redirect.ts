import { NextResponse } from "next/server";
import type { Role } from "@/components/user/userTypes";

const ROLE_ROUTES: Record<Role, string> = {
  customer: "/dashboard/customer",
  technician: "/dashboard/technician",
  admin: "/dashboard/admin",
};

export const redirectByRole = (role: Role, origin: string) => {
  const route = ROLE_ROUTES[role] ?? "/unauthorized";

  return NextResponse.redirect(new URL(route, origin));
};
