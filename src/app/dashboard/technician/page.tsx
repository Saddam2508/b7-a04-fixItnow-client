import {
  BriefcaseBusiness,
  Clock3,
  CalendarDays,
  CheckCircle2,
  Wallet,
} from "lucide-react";

import { getTechnicianDashboardStatsAction } from "@/lib/actions/technician";

import type { TechnicianDashboardStats } from "@/components/technician/dashboard/dashboardTypes";

const statsConfig = [
  {
    title: "Total Services",
    key: "totalServices",
    description: "Your published services",
    icon: BriefcaseBusiness,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Pending Requests",
    key: "pendingRequests",
    description: "Requests waiting for action",
    icon: Clock3,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Upcoming Jobs",
    key: "upcomingJobs",
    description: "Accepted upcoming bookings",
    icon: CalendarDays,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Completed Jobs",
    key: "completedJobs",
    description: "Successfully completed jobs",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
  },
] as const;

const TechnicianPage = async () => {
  let stats: TechnicianDashboardStats | null = null;
  let errorMessage = "";

  try {
    const response = await getTechnicianDashboardStatsAction();

    if (response.success) {
      stats = response.data.stats;
    } else {
      errorMessage = response.message || "Failed to load dashboard statistics.";
    }
  } catch {
    errorMessage = "Unable to load dashboard statistics. Please try again.";
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);

  if (!stats) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
        {errorMessage || "Dashboard statistics are unavailable."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Technician Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your services, bookings, and earnings.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {statsConfig.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {stats[item.key]}
                  </h2>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon size={24} />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-400">{item.description}</p>
            </div>
          );
        })}

        {/* Total Earnings Card */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Earnings
              </p>

              <h2 className="mt-3 text-2xl font-bold text-gray-800">
                {formatCurrency(stats.totalEarnings)}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Wallet size={24} />
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Total paid booking payments
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechnicianPage;
