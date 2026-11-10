"use server";

import { bookingApi } from "@/lib/api/booking";
import type { TUpdateBookingStatus } from "@/components/technician/bookings/booking";

export async function getBookingsAction(technicianId: string) {
  return bookingApi.getAll(technicianId);
}

export async function getBookingByIdAction(id: string) {
  return bookingApi.getById(id);
}

export async function updateBookingStatusAction(
  id: string,
  data: TUpdateBookingStatus,
) {
  return bookingApi.updateStatus(id, data);
}
