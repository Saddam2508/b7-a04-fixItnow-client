"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, XCircle } from "lucide-react";

import { cancelBookingAction } from "@/lib/actions/booking";

interface CancelBookingButtonProps {
  bookingId: string;
}

const CancelBookingButton = ({ bookingId }: CancelBookingButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) return;

    setError(null);

    startTransition(async () => {
      try {
        const response = await cancelBookingAction(bookingId);

        if (!response?.success) {
          setError(response?.message ?? "Unable to cancel booking.");
          return;
        }

        router.refresh();
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className="mt-4 border-t pt-4">
      <button
        type="button"
        onClick={handleCancel}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <XCircle className="size-4" />
        )}

        {isPending ? "Cancelling..." : "Cancel Booking"}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default CancelBookingButton;
