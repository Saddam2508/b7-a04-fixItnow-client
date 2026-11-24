"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Clock3, ReceiptText, XCircle } from "lucide-react";

import { verifyBookingCheckoutSessionAction } from "@/lib/actions/payment";

interface VerificationResponse {
  success: boolean;
  message?: string;
  data?: {
    verified: boolean;
    bookingId?: string;
    paymentId?: string;
    status?: string;
  };
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const [message, setMessage] = useState("Your payment is being verified.");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("Stripe session ID was not found.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;

    const verifyPayment = async (): Promise<void> => {
      if (cancelled) return;

      try {
        const response = (await verifyBookingCheckoutSessionAction(
          sessionId,
        )) as VerificationResponse;

        if (cancelled) return;

        if (
          response.success &&
          response.data?.verified &&
          response.data.bookingId
        ) {
          router.replace(
            `/dashboard/customer/reviews/new/${response.data.bookingId}`,
          );
          return;
        }

        attempts += 1;

        if (attempts >= 10) {
          setMessage(
            "Payment was received by Stripe, but confirmation is still pending. Please check your payment history shortly.",
          );
          setLoading(false);
          return;
        }

        setMessage(
          response.message ?? "Waiting for Stripe webhook confirmation...",
        );

        timeoutId = setTimeout(() => {
          void verifyPayment();
        }, 3000);
      } catch {
        if (cancelled) return;

        setError(
          "Unable to verify your payment. Please check your payment history.",
        );
        setLoading(false);
      }
    };

    void verifyPayment();

    return () => {
      cancelled = true;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [sessionId, router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        {error ? (
          <XCircle size={48} className="mx-auto mb-5 text-red-500" />
        ) : (
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 size={34} />
          </div>
        )}

        <h1 className="text-2xl font-bold">
          {error ? "Verification Failed" : "Payment Submitted!"}
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {error || message}
        </p>

        {loading && !error && (
          <div className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            <Clock3 size={17} />
            Verifying payment...
          </div>
        )}

        <Link
          href="/dashboard/customer/payments"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <ReceiptText size={17} />
          View Payment History
        </Link>

        <Link
          href="/dashboard/customer/bookings"
          className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
        >
          Back to My Bookings
        </Link>
      </div>
    </div>
  );
}
