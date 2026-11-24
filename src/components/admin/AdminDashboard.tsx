
"use client";

import { useEffect, useState } from "react";
import {
  getAdminUsersAction,
  getAdminBookingsAction,
} from "@/lib/actions/admin";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  activeStatus: "BAN" | "UNBAN";
  createdAt: string;
}

interface AdminBooking {
  id: string;
  status: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [userResult, bookingResult] = await Promise.all([
          getAdminUsersAction(),
          getAdminBookingsAction(),
        ]);

        const userResponse =
          userResult as ApiResponse<{ users: AdminUser[] }>;

        const bookingResponse =
          bookingResult as ApiResponse<{ bookings: AdminBooking[] }>;

        if (!userResponse.success || !bookingResponse.success) {
          throw new Error("Dashboard data load করা যায়নি।");
        }

        setUsers(userResponse.data.users);
        setBookings(bookingResponse.data.bookings);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Dashboard data load করা যায়নি।",
        );
      } finally {
        setLoading(false);
      }
    }

    void loadDashboard();
  }, []);

  const totalCustomers = users.filter(
    (user) => user.role === "CUSTOMER",
  ).length;

  const totalTechnicians = users.filter(
    (user) => user.role === "TECHNICIAN",
  ).length;

  const bannedUsers = users.filter(
    (user) => user.activeStatus === "BAN",
  ).length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING",
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      description: "All registered users",
    },
    {
      title: "Customers",
      value: totalCustomers,
      description: "Registered customers",
    },
    {
      title: "Technicians",
      value: totalTechnicians,
      description: "Registered technicians",
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      description: "All service bookings",
    },
    {
      title: "Pending Bookings",
      value: pendingBookings,
      description: "Waiting for acceptance",
    },
    {
      title: "Completed Bookings",
      value: completedBookings,
      description: "Successfully completed",
    },
    {
      title: "Banned Users",
      value: bannedUsers,
      description: "Currently restricted users",
    },
  ];

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading admin dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Overview of users and service bookings.
          </p>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-500">
                {stat.title}
              </p>

              <p className="mt-3 text-3xl font-bold text-gray-900">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">
            Recent Users
          </h2>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {users.slice(0, 5).map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="p-3 font-medium">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">
                      <span
                        className={
                          user.activeStatus === "BAN"
                            ? "rounded-full bg-red-100 px-3 py-1 text-red-700"
                            : "rounded-full bg-green-100 px-3 py-1 text-green-700"
                        }
                      >
                        {user.activeStatus}
                      </span>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-5 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
