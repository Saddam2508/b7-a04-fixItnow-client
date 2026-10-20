import { NextRequest, NextResponse } from "next/server";

import type { Role } from "@/components/user/userTypes";

const ROLE_ROUTES: Record<Role, string> = {
  customer: "/dashboard/customer",
  technician: "/dashboard/technician",
  admin: "/dashboard/admin",
};

export const proxyRedirectByRole = (
  request: NextRequest,
  role: Role,
): NextResponse => {
  const pathname = ROLE_ROUTES[role] ?? "/unauthorized";

  return NextResponse.redirect(new URL(pathname, request.url));
};
