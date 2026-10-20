import { NextRequest, NextResponse } from "next/server";

import { getUserRole2 } from "./lib/helper/jwt";
import { proxyRedirectByRole } from "./lib/helper/proxyRedirect";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (pathname.startsWith("/dashboard") && !accessToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  const role = accessToken ? getUserRole2(accessToken) : null;

  if (accessToken && !role) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    return NextResponse.next();
  }

  if (pathname === "/auth/signin" && role) {
    return proxyRedirectByRole(request, role);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/signin"],
};
