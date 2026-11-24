import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BookNowButtonProps {
  serviceId: string;
  technicianId: string;
}

export default function BookNowButton({
  serviceId,
  technicianId,
}: BookNowButtonProps) {
  const bookingUrl = `/dashboard/customer/bookings/new?serviceId=${encodeURIComponent(
    serviceId,
  )}&technicianId=${encodeURIComponent(technicianId)}`;

  return (
    <Link
      href={bookingUrl}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
    >
      Book Now
      <ArrowRight size={16} />
    </Link>
  );
}
