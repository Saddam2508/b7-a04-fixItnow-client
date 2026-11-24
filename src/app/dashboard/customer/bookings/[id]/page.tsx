import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ReceiptText,
  Wrench,
  Star,
} from "lucide-react";

import { getBookingByIdAction } from "@/lib/actions/booking";

import type {
  Booking,
  BookingApiResponse,
  SingleBookingResponse,
  BookingStatus,
} from "@/components/technician/bookings/booking";
import PayNowButton from "@/components/customer/payments/PayNowButton";

interface BookingDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

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
    month: "long",
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
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const BookingDetailsPage = async ({ params }: BookingDetailsPageProps) => {
  const { id } = await params;

  const response = (await getBookingByIdAction(
    id,
  )) as BookingApiResponse<SingleBookingResponse>;

  if (!response?.success || !response.data?.booking) {
    notFound();
  }

  const booking: Booking = response.data.booking;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/customer/bookings"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to Booking History
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Booking Details
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              View your complete booking information.
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              statusStyles[booking.status]
            }`}
          >
            {booking.status.replaceAll("_", " ")}
          </span>
        </div>
      </div>

      {/* Booking Information */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Service Information */}
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Wrench className="size-5 text-primary" />
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                Service Information
              </h2>
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              {booking.service.title}
            </h3>

            {booking.service.description && (
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {booking.service.description}
              </p>
            )}

            {booking.service.category && (
              <p className="mt-3 text-sm text-gray-500">
                Category:{" "}
                <span className="font-medium text-gray-800">
                  {booking.service.category.name}
                </span>
              </p>
            )}

            <div className="mt-5 border-t pt-4">
              <p className="text-sm text-gray-500">Service Price</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                ৳{booking.service.price.toLocaleString("en-BD")}
              </p>
            </div>
            <div className="border-t pt-4">
              <p className="text-gray-500">Payment Status</p>

              <p
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  booking.payment?.status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : booking.payment?.status === "FAILED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {booking.payment?.status ?? "PENDING"}
              </p>
            </div>

            {booking.status === "COMPLETED" && (
              <div className="border-t pt-4">
                <p className="mb-3 text-sm font-medium text-gray-700">
                  Payment
                </p>

                <PayNowButton
                  bookingId={booking.id}
                  bookingStatus={booking.status}
                  paymentStatus={booking.payment?.status ?? "PENDING"}
                />
              </div>
            )}
          </section>

          {/* Schedule Information */}
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <CalendarDays className="size-5 text-blue-600" />
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                Schedule Information
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Scheduled Date & Time</p>

                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-800">
                  <Clock3 className="size-4 text-gray-400" />
                  {formatDateTime(booking.scheduledAt)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Booking Created</p>

                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-800">
                  <CalendarDays className="size-4 text-gray-400" />
                  {formatDate(booking.createdAt)}
                </p>
              </div>
            </div>
          </section>

          {/* Customer Information */}
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Customer Information
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="mt-1 font-medium text-gray-800">
                  {booking.customer.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="mt-1 font-medium text-gray-800">
                  {booking.customer.email}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Booking Summary */}
        <aside className="h-fit rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <ReceiptText className="size-5 text-primary" />

            <h2 className="text-lg font-semibold text-gray-900">
              Booking Summary
            </h2>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-500">Booking ID</p>
              <p className="mt-1 break-all font-medium text-gray-800">
                {booking.id}
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-500">Booking Status</p>
              <p className="mt-1 font-semibold text-gray-800">
                {booking.status.replaceAll("_", " ")}
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-500">Total Service Price</p>
              <p className="mt-1 text-xl font-bold text-primary">
                ৳{booking.service.price.toLocaleString("en-BD")}
              </p>
            </div>
          </div>
          {booking.status === "COMPLETED" && !booking.review && (
            <Link
              href={`/dashboard/customer/reviews/new/${booking.id}`}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-yellow-600"
            >
              <Star className="size-4" />
              Write a Review
            </Link>
          )}
          <Link
            href="/dashboard/customer/bookings"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft className="size-4" />
            Booking History
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
