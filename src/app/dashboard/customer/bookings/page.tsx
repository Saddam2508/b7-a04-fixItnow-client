import Link from "next/link";
import { CalendarDays, Clock3, ReceiptText } from "lucide-react";

import { getBookingsAction } from "@/lib/actions/booking";

import type {
  Booking,
  BookingApiResponse,
  BookingsResponse,
  BookingStatus,
} from "@/components/technician/bookings/booking";
import CancelBookingButton from "@/components/customer/bookings/CancelBookingButton";
import PayNowButton from "@/components/customer/payments/PayNowButton";

const statusStyles: Record<BookingStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  DECLINED: "bg-red-100 text-red-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-gray-100 text-gray-700",
};

const formatDate = (date: string): string => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return parsedDate.toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date: string): string => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return parsedDate.toLocaleString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const CustomerBookingHistory = async () => {
  const response =
    (await getBookingsAction()) as BookingApiResponse<BookingsResponse>;

  const bookings: Booking[] =
    response?.success && response.data?.bookings ? response.data.bookings : [];
  console.log(bookings);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Booking History
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your service bookings.
          </p>
        </div>

        <Link
          href="/services"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Browse Services
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <ReceiptText className="size-6 text-primary" />
          <div>
            <p className="text-sm text-gray-500">Total Bookings</p>
            <h2 className="text-2xl font-bold">{bookings.length}</h2>
          </div>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl border bg-white px-5 py-16 text-center shadow-sm">
          <CalendarDays className="mx-auto size-12 text-gray-400" />

          <h2 className="mt-4 text-lg font-semibold text-gray-800">
            No bookings found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            You havent booked any services yet.
          </p>

          <Link
            href="/services"
            className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white"
          >
            Explore Services
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingHistoryCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

const BookingHistoryCard = ({ booking }: { booking: Booking }) => {
  return (
    <article className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {booking.service.title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">Booking ID: {booking.id}</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[booking.status]
          }`}
        >
          {booking.status.replaceAll("_", " ")}
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-xs text-gray-500">Service Price</p>
          <p className="mt-1 font-semibold text-gray-800">
            ৳{booking.service.price.toLocaleString("en-BD")}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Scheduled Date & Time</p>
          <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-800">
            <CalendarDays className="size-4 text-gray-400" />
            {formatDateTime(booking.scheduledAt)}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Booking Created</p>
          <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-800">
            <Clock3 className="size-4 text-gray-400" />
            {formatDate(booking.createdAt)}
          </p>
        </div>
      </div>
      {/* Payment Section */}
      {booking.status === "COMPLETED" && (
        <div className="mt-4 border-t pt-4">
          <div className="mb-3">
            <p className="text-xs text-gray-500">Payment Status</p>

            <span
              className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                booking.payment?.status === "PAID"
                  ? "bg-green-100 text-green-700"
                  : booking.payment?.status === "FAILED"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {booking.payment?.status ?? "PENDING"}
            </span>
          </div>

          <PayNowButton
            bookingId={booking.id}
            bookingStatus={booking.status}
            paymentStatus={booking.payment?.status ?? "PENDING"}
          />
        </div>
      )}
      {booking.service.description && (
        <p className="mt-4 border-t pt-4 text-sm text-gray-500">
          {booking.service.description}
        </p>
      )}
      {(booking.status === "PENDING" || booking.status === "ACCEPTED") && (
        <CancelBookingButton bookingId={booking.id} />
      )}
    </article>
  );
};

export default CustomerBookingHistory;
