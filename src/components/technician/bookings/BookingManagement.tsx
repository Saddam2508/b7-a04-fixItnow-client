"use client";

import { useEffect, useState } from "react";

import {
  getBookingsAction,
  updateBookingStatusAction,
} from "@/lib/actions/booking";

import type {
  Booking,
  BookingApiResponse,
  BookingStatus,
  BookingsResponse,
  UpdatedBookingResponse,
} from "@/components/technician/bookings/booking";

import BookingCard from "./BookingCard";

interface BookingManagementProps {
  technicianId: string;
}

export default function BookingManagement({
  technicianId,
}: BookingManagementProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Initial booking fetch
  useEffect(() => {
    if (!technicianId) {
      return;
    }

    let isMounted = true;

    getBookingsAction(technicianId)
      .then((response) => {
        if (!isMounted) return;

        const result = response as BookingApiResponse<BookingsResponse>;

        if (!result.success) {
          throw new Error(result.message || "Failed to load bookings.");
        }

        setBookings(result.data.bookings ?? []);
        setError("");
      })
      .catch((err: unknown) => {
        if (!isMounted) return;

        setError(err instanceof Error ? err.message : "Something went wrong.");
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [technicianId]);

  // Refresh bookings
  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError("");

      const response = (await getBookingsAction(
        technicianId,
      )) as BookingApiResponse<BookingsResponse>;

      if (!response.success) {
        throw new Error(response.message || "Failed to load bookings.");
      }

      setBookings(response.data.bookings ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Update booking status
  const handleUpdateStatus = async (
    bookingId: string,
    status: BookingStatus,
  ) => {
    try {
      setUpdatingId(bookingId);
      setError("");

      const response = (await updateBookingStatusAction(bookingId, {
        status,
      })) as BookingApiResponse<UpdatedBookingResponse>;

      if (!response.success) {
        throw new Error(response.message || "Failed to update booking.");
      }

      const updatedBooking = response.data.updatedBooking;

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                ...updatedBooking,
              }
            : booking,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update booking status.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Booking statistics
  const pendingCount = bookings.filter(
    (booking) => booking.status === "PENDING",
  ).length;

  const activeCount = bookings.filter(
    (booking) =>
      booking.status === "ACCEPTED" || booking.status === "IN_PROGRESS",
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  ).length;

  // Missing technician ID
  if (!technicianId) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-600">
        Technician profile ID is missing.
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

          <p className="mt-3 text-sm text-gray-500">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Booking Management
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your incoming service booking requests.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={handleRefresh}
            className="font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500">Total Bookings</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {bookings.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500">Pending Requests</p>

          <h2 className="mt-2 text-3xl font-bold text-amber-600">
            {pendingCount}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500">Active Bookings</p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {activeCount}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500">Completed</p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {completedCount}
          </h2>
        </div>
      </div>

      {/* Booking List */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Incoming Booking Requests
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Review customer requests and update their booking status.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              No bookings found
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              You don&apos;t have any booking requests yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                loading={updatingId === booking.id}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
