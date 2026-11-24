import { MessageSquare, Star } from "lucide-react";

import type { Review } from "@/components/customer/reviews/reviewTypes";
import { Card, CardContent } from "@/components/ui/card";

interface TechnicianReviewsProps {
  reviews: Review[];
}

export default function TechnicianReviews({ reviews }: TechnicianReviewsProps) {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : 0;

  return (
    <section>
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            CUSTOMER FEEDBACK
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Customer Reviews
          </h2>
        </div>

        {reviews.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <strong className="text-slate-900">
              {averageRating.toFixed(1)}
            </strong>
            <span>({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center p-10 text-center">
            <div className="rounded-full bg-blue-50 p-4 text-blue-600">
              <MessageSquare className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">
              No reviews yet
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Customer reviews will appear here after completed services.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                      {(review.customer?.name || "C").charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {review.customer?.name || "Customer"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm font-semibold text-slate-700">
                      {review.rating}/5
                    </span>
                  </div>
                </div>

                {review.booking?.service?.title && (
                  <p className="mt-4 text-xs font-medium text-blue-600">
                    Service: {review.booking.service.title}
                  </p>
                )}

                {review.comment && (
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                    {review.comment}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
