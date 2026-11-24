import type { TechnicianProfileInput } from "@/components/technician/profile/profileTypes";

import { protectedFetch, serverFetch, serverMutation } from "../core/server";

export const technicianApi = {
  getProfile: () => protectedFetch("/api/technicians"),

  getDashboardStats: () => protectedFetch("/api/technicians/dashboard/stats"),

  updateProfile: async (id: string, data: TechnicianProfileInput) =>
    serverMutation(`/api/technicians/${id}`, data, "PATCH"),

  getAll: () => serverFetch("/api/technicians"),
  getById: (id: string) =>
    serverFetch(`/api/technicians/${encodeURIComponent(id)}`),
};
