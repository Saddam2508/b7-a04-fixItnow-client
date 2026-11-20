import Link from "next/link";
import { Star, MessageSquare, ArrowLeft } from "lucide-react";

import { getMyReviewsAction } from "@/lib/actions/review";

import type {
  Review,
  ReviewApiResponse,
  MyReviewsResponse,
} from "@/components/customer/reviews/reviewTypes";

import ReviewCard from "@/components/customer/reviews/ReviewCard";

export default async function CustomerReviewsPage() {
  let reviews: Review[] = [];
  let error = "";

  try {
    const response = (await getMyReviewsAction()) as
      | ReviewApiResponse<MyReviewsResponse>
      | undefined;

    if (response?.success) {
      reviews = response.data.reviews ?? [];
    } else {
      error = response?.message ?? "Unable to load your reviews.";
    }
  } catch {
    error = "Something went wrong while loading your reviews.";
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage the reviews you have submitted.
          </p>
        </div>

        <Link
          href="/dashboard/customer/bookings"
          className="inline-flex items-center gap-2 self-start rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          My Bookings
        </Link>
      </div>

      {/* Review Statistics */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <MessageSquare size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviews.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-yellow-50 p-3 text-yellow-500">
              <Star size={22} className="fill-yellow-400" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Average Rating Given</p>
              <p className="text-2xl font-bold text-gray-900">
                {averageRating}/5
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Your Submitted Reviews
        </h2>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="rounded-xl border border-dashed bg-white px-5 py-12 text-center">
            <MessageSquare size={36} className="mx-auto text-gray-300" />

            <h3 className="mt-3 font-semibold text-gray-800">No reviews yet</h3>

            <p className="mt-1 text-sm text-gray-500">
              After completing a booking, you can share your experience.
            </p>

            <Link
              href="/dashboard/customer/bookings"
              className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              View My Bookings
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
