"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LogOut,
  Settings,
  UserRound,
  LayoutDashboard,
  Menu,
  Wrench,
  Home,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IUserSession, Role } from "../user/userTypes";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/lib/actions/user";

export default function SiteHeader({
  session,
}: {
  session: IUserSession | null;
}) {
  // Demo state: connect this with your real authentication API.
  const router = useRouter();

  const isLoggedIn = Boolean(session);

  const userName = session?.name ?? "Guest";
  const email = session?.email ?? "";
  const image = session?.image ?? "";
  const role: Role = session?.role ?? "CUSTOMER";

  const dashboardHref = {
    CUSTOMER: "/dashboard/customer",
    TECHNICIAN: "/dashboard/technician",
    ADMIN: "/dashboard/admin",
  }[role];

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Wrench },
    {
      name: "Technicians",
      href: "/services?type=technicians",
      icon: BriefcaseBusiness,
    },
    { name: "About", href: "/about", icon: UserRound },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Wrench className="h-5 w-5" />
          </span>

          <span className="text-xl font-extrabold tracking-tight">
            FixIt<span className="text-blue-600">Now</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Avatar dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="Open profile menu"
                  className="rounded-full outline-none ring-offset-background transition hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Avatar className="h-10 w-10 border-2 border-blue-100">
                    <AvatarImage src={image} alt={userName} />
                    <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
                      {userName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64">
                  {/* User information */}
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={image} alt={userName} />
                      <AvatarFallback>
                        {userName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="truncate text-sm font-semibold">
                        {userName}
                      </span>

                      <span className="truncate text-xs text-muted-foreground">
                        {email}
                      </span>

                      <span className="text-xs font-medium text-blue-600">
                        {role}
                      </span>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => router.push(dashboardHref)}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <UserRound className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>

                  {role === "ADMIN" && (
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/admin/categories")}
                    >
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Manage Categories
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={async () => {
                      await logoutAction();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" className="hidden sm:inline-flex">
                <Link href="/auth/signin">Login</Link>
              </Button>

              <Button className="hidden bg-blue-600 hover:bg-blue-700 sm:inline-flex">
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger
              className="md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-5">
                <Link href="/" className="mb-2 text-xl font-extrabold">
                  FixIt<span className="text-blue-600">Now</span>
                </Link>

                {navLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-blue-600"
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  );
                })}

                <div className="border-t pt-5">
                  {isLoggedIn ? (
                    <Link
                      href={dashboardHref}
                      className="flex items-center gap-3 text-sm font-medium"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button variant="outline">
                        <Link href="/auth/login">Login</Link>
                      </Button>

                      <Button>
                        <Link href="/auth/register">Get Started</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
