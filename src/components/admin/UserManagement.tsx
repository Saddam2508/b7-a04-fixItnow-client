
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAdminUsersAction,
  updateAdminUserStatusAction,
} from "@/lib/actions/admin";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  activeStatus: "BAN" | "UNBAN";
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    users: AdminUser[];
  };
}

const PAGE_SIZE = 8;

export default function UserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getAdminUsersAction();
      const response = result as ApiResponse;

      if (!response.success || !Array.isArray(response.data?.users)) {
        throw new Error(response.message || "User list পাওয়া যায়নি।");
      }

      setUsers(response.data.users);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "User list load করা যায়নি।",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
  let active = true;

  getAdminUsersAction()
    .then((result) => {
      if (!active) return;

      const response = result as ApiResponse;

      if (
        !response.success ||
        !Array.isArray(response.data?.users)
      ) {
        throw new Error(
          response.message || "User list পাওয়া যায়নি।",
        );
      }

      setUsers(response.data.users);
      setError("");
    })
    .catch((err) => {
      if (!active) return;

      setError(
        err instanceof Error
          ? err.message
          : "User list load করা যায়নি।",
      );
    })
    .finally(() => {
      if (active) {
        setLoading(false);
      }
    });

  return () => {
    active = false;
  };
}, []);
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const roleMatch =
        roleFilter === "ALL" || user.role === roleFilter;

      const statusMatch =
        statusFilter === "ALL" || user.activeStatus === statusFilter;

      return searchMatch && roleMatch && statusMatch;
    });
  }, [users, search, roleFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / PAGE_SIZE),
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  async function handleStatusChange(user: AdminUser) {
    const nextStatus =
      user.activeStatus === "BAN" ? "UNBAN" : "BAN";

    const confirmed = window.confirm(
      `আপনি কি ${user.name}-কে ${nextStatus === "BAN" ? "Ban" : "Unban"} করতে চান?`,
    );

    if (!confirmed) return;

    try {
      setUpdatingId(user.id);
      setError("");
      setMessage("");

      const result = await updateAdminUserStatusAction(
        user.id,
        nextStatus,
      );

      const response = result as {
        success: boolean;
        message: string;
      };

      if (!response.success) {
        throw new Error(response.message || "User status পরিবর্তন হয়নি।");
      }

      setMessage(
        `${user.name}-এর Status সফলভাবে ${nextStatus} করা হয়েছে।`,
      );

      await loadUsers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "User status পরিবর্তন করা যায়নি।",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="mt-2 text-gray-600">
              Manage customers, technicians and user accounts.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadUsers()}
            disabled={loading}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {error && (
          <div role="alert" className="rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div role="status" className="rounded-lg bg-green-50 p-4 text-green-700">
            {message}
          </div>
        )}

        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="search"
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search by name or email..."
              className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={roleFilter}
              onChange={(event) => {
                setRoleFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border px-4 py-2"
            >
              <option value="ALL">All Roles</option>
              <option value="CUSTOMER">Customer</option>
              <option value="TECHNICIAN">Technician</option>
              <option value="ADMIN">Admin</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border px-4 py-2"
            >
              <option value="ALL">All Status</option>
              <option value="UNBAN">Active</option>
              <option value="BAN">Banned</option>
            </select>
          </div>

          <div className="mt-5 flex flex-wrap justify-between gap-2 text-sm text-gray-600">
            <span>Total users: {users.length}</span>
            <span>Filtered results: {filteredUsers.length}</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="border-b bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Joined</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center">
                      Loading users...
                    </td>
                  </tr>
                ) : paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
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
                          {user.activeStatus === "BAN" ? "Banned" : "Active"}
                        </span>
                      </td>
                      <td className="p-3">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          disabled={
                            updatingId === user.id || user.role === "ADMIN"
                          }
                          onClick={() => void handleStatusChange(user)}
                          className={
                            user.activeStatus === "BAN"
                              ? "rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                              : "rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                          }
                        >
                          {updatingId === user.id
                            ? "Updating..."
                            : user.activeStatus === "BAN"
                              ? "Unban"
                              : "Ban"}
                        </button>
                      </td>
                    </tr>
                  ))
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
                onClick={() => setCurrentPage((page) => page - 1)}
                className="rounded-lg border px-4 py-2 disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={currentPage >= totalPages || loading}
                onClick={() => setCurrentPage((page) => page + 1)}
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
