import type { TechnicianProfileInput } from "@/components/technician/profile/profileTypes";

import { protectedFetch, serverMutation } from "../core/server";

export const technicianApi = {
  getProfile: () => protectedFetch("/api/technicians"),

  updateProfile: async (id: string, data: TechnicianProfileInput) =>
    serverMutation(`/api/technicians/${id}`, data, "PATCH"),
};
