export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type PaymentMethod = "STRIPE" | "SSLCOMMERZ";

export interface PaymentBooking {
  id: string;
}

export interface Payment {
  id: string;
  bookingId: string | null;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string | null;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
  booking: PaymentBooking | null;
}

export interface PaymentHistoryResponse {
  payments: Payment[];
}

export interface PaymentApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
