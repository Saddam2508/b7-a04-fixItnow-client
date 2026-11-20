import type { TUpdateBookingStatus } from "@/components/technician/bookings/booking";

import { protectedFetch, serverMutation } from "../core/server";

export const bookingApi = {
  getAll: (technicianId?: string) =>
    protectedFetch(
      technicianId
        ? `/api/bookings?technicianId=${encodeURIComponent(technicianId)}`
        : "/api/bookings",
    ),

  getById: (id: string) => protectedFetch(`/api/bookings/${id}`),

  updateStatus: (id: string, data: TUpdateBookingStatus) =>
    serverMutation(`/api/bookings/${id}/status`, data, "PATCH"),
  cancel: (id: string) =>
    serverMutation(`/api/bookings/${id}/cancel`, {}, "PATCH"),
};
