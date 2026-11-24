"use server";

import { paymentApi } from "@/lib/api/payment";

export async function getPaymentsAction() {
  return paymentApi.getAll();
}

export async function createBookingCheckoutAction(bookingId: string) {
  return paymentApi.createCheckout(bookingId);
}

export async function verifyBookingCheckoutSessionAction(sessionId: string) {
  return paymentApi.verifySession(sessionId);
}
