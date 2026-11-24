
"use server";

import { adminApi } from "@/lib/api/admin";

export async function getAdminUsersAction() {
  return adminApi.getUsers();
}

export async function updateAdminUserStatusAction(
  id: string,
  activeStatus: "BAN" | "UNBAN",
) {
  return adminApi.updateUserStatus(id, activeStatus);
}

export async function getAdminBookingsAction() {
  return adminApi.getBookings();
}
