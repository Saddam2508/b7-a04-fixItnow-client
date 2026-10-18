import { requireRole } from "@/lib/core/session";
import { ReactNode } from "react";

const TechnicianLayout = async ({ children }: { children: ReactNode }) => {
  await requireRole("technician");
  return children;
};

export default TechnicianLayout;
