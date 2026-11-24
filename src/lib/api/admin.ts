
import { protectedFetch, serverMutation } from "@/lib/core/server";

export const adminApi = {
  getUsers: () => protectedFetch("/api/admin/users"),

  updateUserStatus: (
    id: string,
    activeStatus: "BAN" | "UNBAN",
  ) =>
    serverMutation(
      `/api/admin/users/${id}`,
      { activeStatus },
      "PATCH",
    ),

  getBookings: () => protectedFetch("/api/admin/bookings"),
};
