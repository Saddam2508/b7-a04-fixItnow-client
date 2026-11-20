"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Star, Trash2, Loader2 } from "lucide-react";

import { deleteReviewAction } from "@/lib/actions/review";

import type { Review } from "./reviewTypes";
import ReviewForm from "./ReviewForm";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmed) return;

    setError("");

    startTransition(async () => {
      try {
        const response = await deleteReviewAction(review.id);

        if (!response?.success) {
          setError(response?.message ?? "Unable to delete this review.");
          return;
        }

        router.refresh();
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "Failed to delete review.",
        );
      }
    });
  };

  if (isEditing) {
    return (
      <ReviewForm
        bookingId={review.bookingId}
        technicianId={review.technicianId}
        review={review}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  const technicianName = review.technician?.user?.name ?? "Technician";

  const serviceName = review.booking?.service?.title ?? "Service";

  return (
    <article className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{serviceName}</h3>

          <p className="mt-1 text-sm text-gray-500">
            Technician: {technicianName}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={17}
              className={
                index < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}

          <span className="ml-1 text-sm font-semibold text-gray-700">
            {review.rating}/5
          </span>
        </div>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-600">
        {review.comment || "No comment provided."}
      </p>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2 border-t pt-4">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
        >
          <Pencil size={15} />
          Edit
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
        >
          {isPending ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Trash2 size={15} />
          )}

          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
}
