"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Loader2 } from "lucide-react";

import { createBookingAction } from "@/lib/actions/booking";
import type { CreateBookingInput } from "@/components/customer/bookings/bookingInput";

interface BookingFormProps {
  serviceId: string;
  technicianId: string;
}

interface BookingActionResponse {
  success?: boolean;
  message?: string;
  data?: {
    booking?: {
      id?: string;
    };
  };
}

function isBookingResponse(value: unknown): value is BookingActionResponse {
  return typeof value === "object" && value !== null;
}

export default function BookingForm({
  serviceId,
  technicianId,
}: BookingFormProps) {
  const router = useRouter();

  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!scheduledAt) {
      setError("Please select your preferred booking date and time.");
      return;
    }

    const selectedDate = new Date(scheduledAt);

    if (Number.isNaN(selectedDate.getTime())) {
      setError("Please select a valid date and time.");
      return;
    }

    if (selectedDate.getTime() <= Date.now()) {
      setError("Please select a future date and time.");
      return;
    }

    const payload: CreateBookingInput = {
      serviceId,
      technicianId,
      scheduledAt: selectedDate.toISOString(),
    };

    try {
      setLoading(true);

      const result: unknown = await createBookingAction(payload);

      if (!isBookingResponse(result) || result.success !== true) {
        setError(
          isBookingResponse(result) && result.message
            ? result.message
            : "Booking could not be created. Please try again.",
        );
        return;
      }

      router.push("/dashboard/customer/bookings");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <CalendarDays size={24} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Book Your Service</h2>

        <p className="mt-2 text-sm text-gray-500">
          Select your preferred date and time to submit your booking request.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="scheduledAt"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Preferred Date & Time
          </label>

          <input
            id="scheduledAt"
            type="datetime-local"
            value={scheduledAt}
            onChange={(event) => setScheduledAt(event.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Submitting...
            </>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </form>
    </div>
  );
}
