import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

import { getBookingsAction } from "@/lib/actions/booking";

import type {
  Booking,
  BookingStatus,
  BookingApiResponse,
  BookingsResponse,
} from "@/components/technician/bookings/booking";

const statusStyles: Record<BookingStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  DECLINED: "bg-red-100 text-red-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-gray-200 text-gray-700",
};

const formatDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

const statsConfig = [
  {
    title: "Total Bookings",
    icon: ClipboardList,
    color: "bg-blue-100 text-blue-600",
    getValue: (bookings: Booking[]) => bookings.length,
  },
  {
    title: "Pending Bookings",
    icon: Clock3,
    color: "bg-yellow-100 text-yellow-600",
    getValue: (bookings: Booking[]) =>
      bookings.filter((booking) => booking.status === "PENDING").length,
  },
  {
    title: "Active Bookings",
    icon: CalendarDays,
    color: "bg-purple-100 text-purple-600",
    getValue: (bookings: Booking[]) =>
      bookings.filter((booking) =>
        ["ACCEPTED", "IN_PROGRESS"].includes(booking.status),
      ).length,
  },
  {
    title: "Completed Bookings",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
    getValue: (bookings: Booking[]) =>
      bookings.filter((booking) => booking.status === "COMPLETED").length,
  },
];

const Customer = async () => {
  let bookings: Booking[] = [];
  let errorMessage = "";

  try {
    const result =
      (await getBookingsAction()) as BookingApiResponse<BookingsResponse>;

    if (result.success) {
      bookings = result.data.bookings;
    } else {
      errorMessage = result.message || "Failed to load your bookings.";
    }
  } catch {
    errorMessage = "Unable to load your bookings. Please try again.";
  }

  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Dashboard Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Customer Dashboard</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your bookings and track your home services.
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statsConfig.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {item.getValue(bookings)}
                  </h2>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Bookings
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your latest service booking activities.
            </p>
          </div>

          <Link
            href="/dashboard/customer/bookings"
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="p-10 text-center">
            <CalendarDays className="mx-auto size-10 text-gray-300" />

            <h3 className="mt-3 font-semibold text-gray-700">
              No bookings yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Browse our services and book your first service.
            </p>

            <Link
              href="/services"
              className="mt-4 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Technician</th>
                  <th className="px-5 py-3 font-medium">Schedule</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="text-gray-700">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800">
                        {booking.service.title}
                      </p>
                    </td>

                    <td className="px-5 py-4">Technician</td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      {formatDate(booking.scheduledAt)}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      {formatCurrency(booking.service.price)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[booking.status]}`}
                      >
                        {booking.status.replaceAll("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customer;
