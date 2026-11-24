import { redirect } from "next/navigation";

import BookingForm from "@/components/customer/bookings/BookingForm";

interface NewBookingPageProps {
  searchParams: Promise<{
    serviceId?: string;
    technicianId?: string;
  }>;
}

export default async function NewBookingPage({
  searchParams,
}: NewBookingPageProps) {
  const { serviceId, technicianId } = await searchParams;

  if (!serviceId || !technicianId) {
    redirect("/services");
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-10 sm:py-16">
      <div className="mx-auto mb-8 max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          FixItNow Booking
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Schedule Your Service
        </h1>

        <p className="mt-3 text-gray-600">
          Choose a convenient date and time for your service.
        </p>
      </div>

      <BookingForm serviceId={serviceId} technicianId={technicianId} />
    </div>
  );
}
