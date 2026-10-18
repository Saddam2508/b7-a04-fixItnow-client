import { requireRole } from "@/lib/core/session";
import { ReactNode } from "react";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  await requireRole("admin");
  return children;
};

export default AdminLayout;
