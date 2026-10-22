import { requireRole } from "@/lib/core/session";
import { ReactNode } from "react";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  await requireRole("ADMIN");
  return children;
};

export default AdminLayout;
