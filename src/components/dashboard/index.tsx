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
import { navLinks } from "./navLinkTypes";

export async function DashboardSidebar() {
  const customerNavLinks: navLinks[] = [
    { icon: House, href: "/dashboard/client", label: "Dashboard" },
    {
      icon: Bell,
      href: "/dashboard/client/tasks/post-tasks",
      label: "Post a Task",
    },
    { icon: Briefcase, href: "/dashboard/client/tasks", label: "My Tasks" },
    { icon: FileText, href: "/dashboard/client/proposals", label: "Proposals" },
    { icon: Person, href: "/dashboard/client/profile", label: "Profile" },
  ];

  const technicianNavLinks: navLinks[] = [
    { icon: House, href: "/dashboard/freelancer", label: "Dashboard" },
    {
      icon: Magnifier,
      href: "/dashboard/freelancer/browse-tasks",
      label: "Browse Tasks",
    },
    {
      icon: FileText,
      href: "/dashboard/freelancer/proposals",
      label: "My Proposals",
    },
    {
      icon: Briefcase,
      href: "/dashboard/freelancer/projects",
      label: "Active Projects",
    },
    {
      icon: CreditCard,
      href: "/dashboard/freelancer/earnings",
      label: "Earnings",
    },
    {
      icon: Person,
      href: "/dashboard/freelancer/profile",
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
    customer: customerNavLinks,
    technician: technicianNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role || "customer"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Sheet>
        <SheetTrigger>
          <Button className="lg:hidden" variant="secondary">
            <PanelLeft />
            Sidebar
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>

          <div className="px-4">
            {/* এখানে তোমার navContent বসবে */}
            <nav>
              <ul className="space-y-2">
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <a href="/settings">Settings</a>
                </li>
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
