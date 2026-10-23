import {
  Bell,
  Briefcase,
  Person,
  FileText,
  CreditCard,
} from "@gravity-ui/icons";

import {
  House,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  UserRound,
  PanelLeft,
  Users,
  Star,
  Search,
  CalendarCheck,
  Tags,
} from "lucide-react";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { getUserSession } from "@/lib/core/session";
import type { navLinks } from "./navLinkTypes";

export async function DashboardSidebar() {
  const user = await getUserSession();

  const customerNavLinks: navLinks[] = [
    {
      icon: House,
      href: "/dashboard/customer",
      label: "Dashboard",
    },
    {
      icon: Search,
      href: "/services",
      label: "Browse Services",
    },
    {
      icon: CalendarDays,
      href: "/dashboard/customer/bookings",
      label: "My Bookings",
    },
    {
      icon: CreditCard,
      href: "/dashboard/customer/payments",
      label: "Payment History",
    },
    {
      icon: Star,
      href: "/dashboard/customer/reviews",
      label: "My Reviews",
    },
    {
      icon: UserRound,
      href: "/dashboard/customer/profile",
      label: "My Profile",
    },
  ];

  const technicianNavLinks: navLinks[] = [
    {
      icon: House,
      href: "/dashboard/technician",
      label: "Dashboard",
    },
    {
      icon: BriefcaseBusiness,
      href: "/dashboard/technician/services",
      label: "My Services",
    },
    {
      icon: CalendarDays,
      href: "/dashboard/technician/availability",
      label: "Availability",
    },
    {
      icon: ClipboardList,
      href: "/dashboard/technician/bookings",
      label: "Booking Requests",
    },
    {
      icon: UserRound,
      href: "/dashboard/technician/profile",
      label: "My Profile",
    },
  ];

  const adminNavLinks: navLinks[] = [
    {
      icon: House,
      href: "/dashboard/admin",
      label: "Dashboard",
    },
    {
      icon: Users,
      href: "/dashboard/admin/users",
      label: "Manage Users",
    },
    {
      icon: Tags,
      href: "/dashboard/admin/categories",
      label: "Manage Categories",
    },
    {
      icon: CalendarCheck,
      href: "/dashboard/admin/bookings",
      label: "Manage Bookings",
    },
  ];

  const navLinksMap = {
    CUSTOMER: customerNavLinks,
    TECHNICIAN: technicianNavLinks,
    ADMIN: adminNavLinks,
  };

  const navItems =
    user?.role && user.role in navLinksMap
      ? navLinksMap[user.role as keyof typeof navLinksMap]
      : [];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            href={item.href}
          >
            <Icon className="size-5 text-muted bg-black" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>

      <Sheet>
        <SheetTrigger
          render={
            <Button className="lg:hidden" variant="secondary">
              <PanelLeft />
              Sidebar
            </Button>
          }
        />

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>

          <div className="px-4">{navContent}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}
