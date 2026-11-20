"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";

import { createBookingCheckoutAction } from "@/lib/actions/payment";

interface PayNowButtonProps {
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

export default function PayNowButton({ bookingId }: PayNowButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleCheckout = () => {
    setError("");

    startTransition(async () => {
      try {
        const response = (await createBookingCheckoutAction(
          bookingId,
        )) as CheckoutResponse;

        if (!response.success || !response.data?.paymentUrl) {
          setError(response.message || "Unable to start checkout.");
          return;
        }

        router.push(response.data.paymentUrl);
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <Loader2 size={17} className="animate-spin" />
        ) : (
          <CreditCard size={17} />
        )}

        {isPending ? "Redirecting..." : "Pay Now"}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
