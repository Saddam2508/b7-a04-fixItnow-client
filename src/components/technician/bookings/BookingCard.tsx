import type {
  Booking,
  BookingStatus,
} from "@/components/technician/bookings/booking";

import BookingActions from "./BookingActions";
import BookingStatusBadge from "./BookingStatusBadge";

interface BookingCardProps {
  booking: Booking;
  loading: boolean;
  onUpdateStatus: (id: string, status: BookingStatus) => void;
}

export default function BookingCard({
  booking,
  loading,
  onUpdateStatus,
}: BookingCardProps) {
  const scheduledDate = new Date(booking.scheduledAt);

  const formattedDate = Number.isNaN(scheduledDate.getTime())
    ? "Invalid date"
    : new Intl.DateTimeFormat("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(scheduledDate);

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {booking.service.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Booking ID: {booking.id}
          </p>
        </div>

        <BookingStatusBadge status={booking.status} />
      </div>

      <div className="my-5 grid gap-5 border-y border-gray-100 py-5 dark:border-gray-700 sm:grid-cols-2">
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
            Customer Information
          </h4>

          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Name:</span> {booking.customer.name}
          </p>

          <p className="mt-2 break-all text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Email:</span> {booking.customer.email}
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
            Service Information
          </h4>

          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Service:</span>{" "}
            {booking.service.title}
          </p>

          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Price:</span>{" "}
            {booking.service.price.toLocaleString("en-BD")} BDT
          </p>
        </div>
      </div>

      {booking.service.description && (
        <div className="mb-5">
          <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            Service Description
          </h4>

          <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
            {booking.service.description}
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Requested Schedule
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
            {formattedDate}
          </p>
        </div>

        <BookingActions
          status={booking.status}
          loading={loading}
          onUpdate={(status) => onUpdateStatus(booking.id, status)}
        />
      </div>
    </article>
  );
}
