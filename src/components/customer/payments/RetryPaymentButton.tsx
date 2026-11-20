"use client";

import { useState, useTransition } from "react";
import { CreditCard, Loader2 } from "lucide-react";

import { createBookingCheckoutAction } from "@/lib/actions/payment";

interface RetryPaymentButtonProps {
  bookingId: string;
}

interface CheckoutResponse {
  success: boolean;
  message: string;
  data?: {
    paymentUrl: string;
    sessionId: string;
  };
}

export default function RetryPaymentButton({
  bookingId,
}: RetryPaymentButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleRetry = () => {
    setError("");

    startTransition(async () => {
      try {
        const response = (await createBookingCheckoutAction(
          bookingId,
        )) as CheckoutResponse;

        if (!response.success || !response.data?.paymentUrl) {
          setError(response.message || "Unable to retry payment.");
          return;
        }

        window.location.assign(response.data.paymentUrl);
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleRetry}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <CreditCard size={16} />
        )}

        {isPending ? "Processing..." : "Retry Payment"}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
