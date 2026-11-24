
"use client";

import { useEffect, useMemo, useState } from "react";
import { getAdminBookingsAction } from "@/lib/actions/admin";

type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

interface AdminBooking {
  id: string;
  scheduledAt: string;
  status: BookingStatus;
  createdAt: string;
  customer?: {
    name?: string;
    email?: string;
  };
  technician?: {
    id?: string;
    user?: {
      name?: string;
    };
  };
  technicianId: string;
  service?: {
    title?: string;
    name?: string;
    price?: number;
  };
  payment?: {
    status?: PaymentStatus;
    amount?: number;
    method?: string;
    transactionId?: string | null;
  } | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    bookings: AdminBooking[];
  };
}

const PAGE_SIZE = 10;

const bookingStatusStyles: Record<BookingStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  ACCEPTED: "bg-blue-100 text-blue-800",
  DECLINED: "bg-red-100 text-red-800",
  IN_PROGRESS: "bg-indigo-100 text-indigo-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-gray-200 text-gray-700",
};

const paymentStatusStyles: Record<PaymentStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  REFUNDED: "bg-purple-100 text-purple-800",
};

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString();
}

function formatStatus(value: string) {
  return value.replaceAll("_", " ");
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [paymentFilter, setPaymentFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getAdminBookingsAction()
      .then((result) => {
        if (!active) return;

        const response = result as ApiResponse;

        if (
          !response.success ||
          !Array.isArray(response.data?.bookings)
        ) {
          throw new Error(
            response.message || "Booking list পাওয়া যায়নি।",
          );
        }

        setBookings(response.data.bookings);
        setError("");
      })
      .catch((err) => {
        if (!active) return;

        setError(
          err instanceof Error
            ? err.message
            : "Booking list load করা যায়নি।",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleRefresh() {
    try {
      setLoading(true);
      setError("");

      const result = await getAdminBookingsAction();
      const response = result as ApiResponse;

      if (
        !response.success ||
        !Array.isArray(response.data?.bookings)
      ) {
        throw new Error(
          response.message || "Booking list পাওয়া যায়নি।",
        );
      }

      setBookings(response.data.bookings);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Booking list load করা যায়নি।",
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredBookings = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const customerName = booking.customer?.name ?? "";
      const customerEmail = booking.customer?.email ?? "";
      const serviceName =
        booking.service?.title ?? booking.service?.name ?? "";
      const bookingId = booking.id;

      const searchMatch =
        !keyword ||
        bookingId.toLowerCase().includes(keyword) ||
        customerName.toLowerCase().includes(keyword) ||
        customerEmail.toLowerCase().includes(keyword) ||
        serviceName.toLowerCase().includes(keyword);

      const statusMatch =
        statusFilter === "ALL" || booking.status === statusFilter;

      const paymentStatus = booking.payment?.status ?? "UNPAID";

      const paymentMatch =
        paymentFilter === "ALL" || paymentStatus === paymentFilter;

      return searchMatch && statusMatch && paymentMatch;
    });
  }, [bookings, search, statusFilter, paymentFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBookings.length / PAGE_SIZE),
  );

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const pendingCount = bookings.filter(
    (booking) => booking.status === "PENDING",
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  ).length;

  const paidCount = bookings.filter(
    (booking) => booking.payment?.status === "PAID",
  ).length;

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Bookings
            </h1>
            <p className="mt-2 text-gray-600">
              View and monitor all service bookings.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void handleRefresh()}
            disabled={loading}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {error}
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Bookings", value: bookings.length },
            { label: "Pending", value: pendingCount },
            { label: "Completed", value: completedCount },
            { label: "Paid Bookings", value: paidCount },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search ID, customer or service..."
              className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border px-4 py-2"
            >
              <option value="ALL">All Booking Status</option>
              <option value="PENDING">Pending</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="DECLINED">Declined</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(event) => {
                setPaymentFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border px-4 py-2"
            >
              <option value="ALL">All Payment Status</option>
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
              <option value="UNPAID">No Payment Record</option>
            </select>
          </div>

          <div className="mt-5 flex flex-wrap justify-between gap-2 text-sm text-gray-600">
            <span>Total records: {bookings.length}</span>
            <span>Filtered records: {filteredBookings.length}</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="border-b bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Technician</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Scheduled At</th>
                  <th className="p-3">Booking Status</th>
                  <th className="p-3">Payment</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center">
                      Loading bookings...
                    </td>
                  </tr>
                ) : paginatedBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-8 text-center text-gray-500"
                    >
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  paginatedBookings.map((booking) => {
                    const paymentStatus =
                      booking.payment?.status;

                    const technicianName =
                      booking.technician?.user?.name;

                    return (
                      <tr
                        key={booking.id}
                        className="border-b last:border-0"
                      >
                        <td className="p-3 font-mono text-xs">
                          {booking.id.slice(0, 8)}...
                        </td>

                        <td className="p-3">
                          <p className="font-medium">
                            {booking.customer?.name ?? "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.customer?.email ?? "—"}
                          </p>
                        </td>

                        <td className="p-3">
                          {technicianName ?? booking.technicianId}
                        </td>

                        <td className="p-3">
                          {booking.service?.title ??
                            booking.service?.name ??
                            "—"}
                        </td>

                        <td className="p-3">
                          {formatDate(booking.scheduledAt)}
                        </td>

                        <td className="p-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${bookingStatusStyles[booking.status]}`}
                          >
                            {formatStatus(booking.status)}
                          </span>
                        </td>

                        <td className="p-3">
                          {paymentStatus ? (
                            <div className="space-y-1">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${paymentStatusStyles[paymentStatus]}`}
                              >
                                {formatStatus(paymentStatus)}
                              </span>
                              {booking.payment?.amount !== undefined && (
                                <p className="text-xs text-gray-500">
                                  Amount: {booking.payment.amount}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">
                              No payment
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage === 1 || loading}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                className="rounded-lg border px-4 py-2 disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={currentPage >= totalPages || loading}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1),
                  )
                }
                className="rounded-lg border px-4 py-2 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
