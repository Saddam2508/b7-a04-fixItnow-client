import Link from "next/link";
import { ArrowLeft, CircleX, CreditCard } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <CircleX size={34} />
        </div>

        <h1 className="text-2xl font-bold">Payment Cancelled</h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          You cancelled the checkout process. No successful payment confirmation
          was received. You can return to your booking and try again.
        </p>

        <Link
          href="/dashboard/customer/bookings"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <ArrowLeft size={17} />
          Back to My Bookings
        </Link>

        <Link
          href="/dashboard/customer/payments"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <CreditCard size={16} />
          Payment History
        </Link>
      </div>
    </div>
  );
}
