import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getBookingByIdAction } from "@/lib/actions/booking";
import ReviewForm from "@/components/customer/reviews/ReviewForm";

import type {
  BookingApiResponse,
  SingleBookingResponse,
} from "@/components/technician/bookings/booking";

interface ReviewableBooking {
  id: string;
  technicianId: string;
  status: string;
  review?: {
    id: string;
  } | null;
  service: {
    id: string;
    title: string;
  };
}

interface NewReviewPageProps {
  params: Promise<{
    bookingId: string;
  }>;
}

export default async function NewReviewPage({ params }: NewReviewPageProps) {
  const { bookingId } = await params;

  const response = (await getBookingByIdAction(
    bookingId,
  )) as BookingApiResponse<SingleBookingResponse>;

  if (!response?.success || !response.data?.booking) {
    notFound();
  }

  const booking = response.data.booking as unknown as ReviewableBooking;

  if (booking.status !== "COMPLETED") {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Review Not Available
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          You can only review a completed booking.
        </p>

        <Link
          href="/dashboard/customer/bookings"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to Bookings
        </Link>
      </div>
    );
  }

  if (booking.review) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Review Already Submitted
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          You have already submitted a review for this booking. You can edit it
          from My Reviews.
        </p>

        <Link
          href="/dashboard/customer/reviews"
          className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          View My Reviews
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href={`/dashboard/customer/bookings/${booking.id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to Booking
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Review Your Service
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Service: {booking.service.title}
        </p>
      </div>

      <ReviewForm bookingId={booking.id} technicianId={booking.technicianId} />
    </div>
  );
}
