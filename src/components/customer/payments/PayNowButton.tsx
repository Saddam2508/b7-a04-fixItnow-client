"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2, CheckCircle2 } from "lucide-react";

import { createBookingCheckoutAction } from "@/lib/actions/payment";

interface PayNowButtonProps {
  bookingId: string;
  bookingStatus: string;
  paymentStatus: string;
}

interface CheckoutResponse {
  success: boolean;
  message: string;
  data?: {
    paymentUrl: string;
    sessionId: string;
  };
}

export default function PayNowButton({
  bookingId,
  bookingStatus,
  paymentStatus,
}: PayNowButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // কাজ সম্পন্ন না হলে Payment করা যাবে না।
  if (bookingStatus !== "COMPLETED") {
    return null;
  }

  // Payment ইতিমধ্যে সম্পন্ন।
  if (paymentStatus === "PAID") {
    return (
      <div className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-5 py-2.5 text-sm font-semibold text-green-700">
        <CheckCircle2 size={18} />
        Payment Completed
      </div>
    );
  }

  // শুধু Pending Payment-এর জন্য Checkout।
  if (paymentStatus !== "PENDING" && paymentStatus !== "FAILED") {
    return null;
  }

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

        // Stripe-এর External URL-এ Redirect।
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

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
