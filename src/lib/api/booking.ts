import type { TUpdateBookingStatus } from "@/components/technician/bookings/booking";

import { protectedFetch, serverMutation } from "../core/server";

export const bookingApi = {
  getAll: (technicianId: string) =>
    protectedFetch(
      `/api/bookings?technicianId=${encodeURIComponent(technicianId)}`,
    ),

  getById: (id: string) => protectedFetch(`/api/bookings/${id}`),

  updateStatus: (id: string, data: TUpdateBookingStatus) =>
    serverMutation(`/api/bookings/${id}/status`, data, "PATCH"),
};
