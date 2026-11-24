"use server";

import { bookingApi } from "@/lib/api/booking";
import type { TUpdateBookingStatus } from "@/components/technician/bookings/booking";
import { CreateBookingInput } from "@/components/customer/bookings/bookingInput";

export async function getBookingsAction(technicianId?: string) {
  return bookingApi.getAll(technicianId);
}

export async function getBookingByIdAction(id: string) {
  return bookingApi.getById(id);
}

export async function createBookingAction(data: CreateBookingInput) {
  return bookingApi.create(data);
}

export async function updateBookingStatusAction(
  id: string,
  data: TUpdateBookingStatus,
) {
  return bookingApi.updateStatus(id, data);
}

export async function cancelBookingAction(id: string) {
  return bookingApi.cancel(id);
}
