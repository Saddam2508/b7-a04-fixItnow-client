import { protectedFetch, serverMutation } from "@/lib/core/server";

export const paymentApi = {
  getAll: () => protectedFetch("/api/payments"),
  createCheckout: (bookingId: string) =>
    serverMutation(
      `/api/payments/checkout/${encodeURIComponent(bookingId)}`,
      {},
      "POST",
    ),
};
