export type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

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
