import { NextRequest, NextResponse } from "next/server";
import { getUserRole2 } from "./lib/helper/jwt";
import { redirectByRole } from "./lib/helper/redirect";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // No token: protect dashboard routes
  if (pathname.startsWith("/dashboard") && !accessToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Token exists: decode role
  const role = accessToken ? getUserRole2(accessToken) : null;

  // Invalid or missing role
  if (accessToken && !role) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    return NextResponse.next();
  }

  // Redirect authenticated users away from signin
  if (pathname === "/auth/signin" && role) {
    const response = redirectByRole(role, request.url);

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/signin"],
};
