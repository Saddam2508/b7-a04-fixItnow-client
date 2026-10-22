import { requireRole } from "@/lib/core/session";
import { ReactNode } from "react";

const CustomerLayout = async ({ children }: { children: ReactNode }) => {
  await requireRole("CUSTOMER");
  return children;
};

export default CustomerLayout;
