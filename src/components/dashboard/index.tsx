import {
  Bell,
  Briefcase,
  House,
  Magnifier,
  Person,
  FileText,
  CreditCard,
} from "@gravity-ui/icons";

import { PanelLeft, Users } from "lucide-react";
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
    { icon: House, href: "/dashboard/customer", label: "Dashboard" },
    {
      icon: Bell,
      href: "/dashboard/customer/tasks/post-tasks",
      label: "Post a Task",
    },
    { icon: Briefcase, href: "/dashboard/customer/tasks", label: "My Tasks" },
    {
      icon: FileText,
      href: "/dashboard/customer/proposals",
      label: "Proposals",
    },
    { icon: Person, href: "/dashboard/customer/profile", label: "Profile" },
  ];

  const technicianNavLinks: navLinks[] = [
    { icon: House, href: "/dashboard/technician", label: "Dashboard" },
    {
      icon: Magnifier,
      href: "/dashboard/technician/browse-tasks",
      label: "Browse Tasks",
    },
    {
      icon: FileText,
      href: "/dashboard/technician/proposals",
      label: "My Proposals",
    },
    {
      icon: Briefcase,
      href: "/dashboard/technician/projects",
      label: "Active Projects",
    },
    {
      icon: CreditCard,
      href: "/dashboard/technician/earnings",
      label: "Earnings",
    },
    {
      icon: Person,
      href: "/dashboard/technician/profile",
      label: "Edit Profile",
    },
  ];

  const adminNavLinks: navLinks[] = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
    { icon: Briefcase, href: "/dashboard/admin/tasks", label: "Manage Tasks" },
    {
      icon: CreditCard,
      href: "/dashboard/admin/transactions",
      label: "Transactions",
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
            <Icon className="size-5 text-muted" />
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
