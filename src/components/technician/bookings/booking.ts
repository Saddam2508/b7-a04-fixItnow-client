export type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface TUpdateBookingStatus {
  status: BookingStatus;
}

export interface BookingCustomer {
  id: string;
  name: string;
  email: string;
}

export interface BookingService {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category?: {
    id: string;
    name: string;
  };
}

export interface BookingPayment {
  id: string;
  status: PaymentStatus;
  amount: number;
  transactionId?: string | null;
  paidAt?: string | null;
}

export interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  scheduledAt: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  customer: BookingCustomer;
  service: BookingService;
  payment?: BookingPayment | null;
  review?: {
    id: string;
    rating: number;
    comment: string | null;
  } | null;
}

export interface BookingApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface BookingsResponse {
  bookings: Booking[];
}

export interface SingleBookingResponse {
  booking: Booking;
}

export interface UpdatedBookingResponse {
  updatedBooking: Booking;
}

export type PaymentMethod = "STRIPE" | "SSLCOMMERZ";

export interface BookingPayment {
  id: string;
  bookingId: string | null;
  userId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  stripeCustomerId: string;
  stripeSubscriptionId?: string | null;
  transactionId?: string | null;
  paidAt?: string | null;
  createdAt: string;
}
