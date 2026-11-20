import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  ReceiptText,
  Wallet,
  RefreshCw,
} from "lucide-react";

import { getPaymentsAction } from "@/lib/actions/payment";

import type {
  Payment,
  PaymentApiResponse,
  PaymentHistoryResponse,
  PaymentStatus,
} from "@/components/customer/payments/paymentTypes";
import RetryPaymentButton from "@/components/customer/payments/RetryPaymentButton";

const statusStyles: Record<PaymentStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-purple-100 text-purple-700",
};

const formatDate = (date: string | null) => {
  if (!date) return "Not available";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);

export default async function CustomerPaymentHistoryPage() {
  let payments: Payment[] = [];
  let errorMessage = "";

  try {
    const response =
      (await getPaymentsAction()) as PaymentApiResponse<PaymentHistoryResponse>;

    if (response.success && response.data) {
      payments = response.data.payments ?? [];
    } else {
      errorMessage = response.message || "Unable to load payment history.";
    }
  } catch {
    errorMessage = "Something went wrong while loading payment history.";
  }

  const totalPaid = payments
    .filter((payment) => payment.status === "PAID")
    .reduce((total, payment) => total + payment.amount, 0);

  const pendingPayments = payments.filter(
    (payment) => payment.status === "PENDING",
  ).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/dashboard/customer"
              className="transition hover:text-primary"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span>Payment History</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Payment History
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View and track your booking payment transactions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/customer/payments"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
          >
            <RefreshCw size={16} />
            Refresh Payments
          </Link>

          <Link
            href="/dashboard/customer/bookings"
            className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
          >
            <ArrowLeft size={16} />
            My Bookings
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <h2 className="mt-2 text-2xl font-bold">
                {formatAmount(totalPaid)}
              </h2>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-700">
              <Wallet size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
              <h2 className="mt-2 text-2xl font-bold">{pendingPayments}</h2>
            </div>

            <div className="rounded-lg bg-yellow-100 p-3 text-yellow-700">
              <CreditCard size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Payment List */}
      <section className="rounded-xl border bg-card">
        <div className="flex items-center gap-2 border-b p-5">
          <ReceiptText size={20} className="text-primary" />
          <h2 className="font-semibold">Transaction Records</h2>
          <span className="ml-auto text-sm text-muted-foreground">
            {payments.length} payments
          </span>
        </div>

        {errorMessage ? (
          <div className="p-8 text-center">
            <p className="font-medium text-red-600">{errorMessage}</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
              <ReceiptText size={26} className="text-muted-foreground" />
            </div>

            <h3 className="text-lg font-semibold">No payments found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Your booking payment transactions will appear here.
            </p>

            <Link
              href="/dashboard/customer/bookings"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              View My Bookings
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {payments.map((payment) => (
              <PaymentHistoryCard key={payment.id} payment={payment} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function PaymentHistoryCard({ payment }: { payment: Payment }) {
  return (
    <article className="space-y-4 p-5 transition hover:bg-muted/30">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">
              {payment.bookingId ? `Booking Payment` : "Account Payment"}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusStyles[payment.status]
              }`}
            >
              {payment.status}
            </span>
          </div>

          <p className="mt-1 break-all text-xs text-muted-foreground">
            Payment ID: {payment.id}
          </p>
        </div>

        <p className="text-xl font-bold">{formatAmount(payment.amount)}</p>
      </div>

      <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CreditCard size={16} />
          <span>
            Method:{" "}
            <span className="font-medium text-foreground">
              {payment.method}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays size={16} />
          <span>
            Created:{" "}
            <span className="font-medium text-foreground">
              {formatDate(payment.createdAt)}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays size={16} />
          <span>
            Paid:{" "}
            <span className="font-medium text-foreground">
              {formatDate(payment.paidAt)}
            </span>
          </span>
        </div>
      </div>

      {payment.transactionId && (
        <p className="break-all text-xs text-muted-foreground">
          Transaction ID: {payment.transactionId}
        </p>
      )}

      {payment.bookingId && (
        <Link
          href={`/dashboard/customer/bookings/${payment.bookingId}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View Booking Details
        </Link>
      )}
      {payment.bookingId && payment.status === "FAILED" && (
        <RetryPaymentButton bookingId={payment.bookingId} />
      )}
    </article>
  );
}
