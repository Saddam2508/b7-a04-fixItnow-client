"use client";

import type { BookingStatus } from "@/components/technician/bookings/booking";

interface BookingActionsProps {
  status: BookingStatus;
  loading: boolean;
  onUpdate: (status: BookingStatus) => void;
}

export default function BookingActions({
  status,
  loading,
  onUpdate,
}: BookingActionsProps) {
  const buttonClass =
    "rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

  if (status === "PENDING") {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => onUpdate("ACCEPTED")}
          className={`${buttonClass} bg-green-600 text-white hover:bg-green-700`}
        >
          Accept
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => onUpdate("DECLINED")}
          className={`${buttonClass} bg-red-600 text-white hover:bg-red-700`}
        >
          Decline
        </button>
      </div>
    );
  }

  if (status === "ACCEPTED") {
    return (
      <button
        type="button"
        disabled={loading}
        onClick={() => onUpdate("IN_PROGRESS")}
        className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-700`}
      >
        Mark In Progress
      </button>
    );
  }

  if (status === "IN_PROGRESS") {
    return (
      <button
        type="button"
        disabled={loading}
        onClick={() => onUpdate("COMPLETED")}
        className={`${buttonClass} bg-green-600 text-white hover:bg-green-700`}
      >
        Mark Completed
      </button>
    );
  }

  return null;
}
