import Link from "next/link";
import { CheckCircle2, Clock3, ReceiptText } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 size={34} />
        </div>

        <h1 className="text-2xl font-bold">Payment Submitted!</h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Thank you! Your payment is being verified. Your payment status will
          update after Stripe confirms the transaction through its webhook.
        </p>

        <div className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
          <Clock3 size={17} />
          Payment confirmation may take a moment.
        </div>

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
