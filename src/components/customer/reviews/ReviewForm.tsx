"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star, Loader2, Send } from "lucide-react";

import { createReviewAction, updateReviewAction } from "@/lib/actions/review";

import type { CreateReviewInput, Review } from "./reviewTypes";

interface ReviewFormProps {
  bookingId: string;
  technicianId: string;
  review?: Review;
  onCancel?: () => void;
}

export default function ReviewForm({
  bookingId,
  technicianId,
  review,
  onCancel,
}: ReviewFormProps) {
  const router = useRouter();

  const [rating, setRating] = useState(review?.rating ?? 0);
  const [comment, setComment] = useState(review?.comment ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

  const isEditing = Boolean(review);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5.");
      return;
    }

    startTransition(async () => {
      try {
        const response = isEditing
          ? await updateReviewAction(review!.id, {
              rating,
              comment: comment.trim(),
            })
          : await createReviewAction({
              bookingId,
              technicianId,
              rating,
              comment: comment.trim(),
            } satisfies CreateReviewInput);

        if (!response?.success) {
          setError(response?.message ?? "Unable to save your review.");
          return;
        }

        setSuccess(
          isEditing
            ? "Review updated successfully."
            : "Review submitted successfully.",
        );

        router.refresh();

        if (isEditing) {
          onCancel?.();
        } else {
          setRating(0);
          setComment("");
        }
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        );
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border bg-white p-5 shadow-sm"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {isEditing ? "Edit Your Review" : "Write a Review"}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Share your experience with this technician.
        </p>
      </div>

      {/* Star Rating */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Your Rating
        </label>

        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            const selected = starValue <= rating;

            return (
              <button
                key={starValue}
                type="button"
                disabled={isPending}
                onClick={() => setRating(starValue)}
                aria-label={`Rate ${starValue} out of 5`}
                aria-pressed={rating === starValue}
                className="rounded p-1 transition hover:scale-110 disabled:cursor-not-allowed"
              >
                <Star
                  size={30}
                  className={
                    selected
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              </button>
            );
          })}

          <span className="ml-2 text-sm font-medium text-gray-600">
            {rating > 0 ? `${rating}/5` : "Select rating"}
          </span>
        </div>
      </div>

      {/* Comment */}
      <div>
        <label
          htmlFor="review-comment"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Your Comment
        </label>

        <textarea
          id="review-comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write about your experience..."
          rows={4}
          maxLength={1000}
          disabled={isPending}
          className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
        />

        <p className="mt-1 text-right text-xs text-gray-400">
          {comment.length}/1000
        </p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="text-sm text-green-600">
          {success}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isPending || rating === 0}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Send size={17} />
          )}

          {isPending
            ? "Saving..."
            : isEditing
              ? "Update Review"
              : "Submit Review"}
        </button>

        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-lg border px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
