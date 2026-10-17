import { DashboardSidebar } from "@/components/dashbaord";
import React from "react";

const DashboardLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
