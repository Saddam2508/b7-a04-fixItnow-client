import BookingManagement from "@/components/technician/bookings/BookingManagement";
import { TechnicianProfileFormData } from "@/components/technician/profile/profileTypes";
import { getTechnicianProfileAction } from "@/lib/actions/technician";

export default async function TechnicianBookingsPage() {
  const result = await getTechnicianProfileAction();

  if (!result?.success) {
    throw new Error(result?.message || "Profile load failed");
  }

  const responseData = result.data as {
    technicians?: TechnicianProfileFormData[];
  };

  const technician = responseData.technicians?.[0];

  if (!technician) {
    throw new Error("Technician profile not found");
  }

  return <BookingManagement technicianId={technician.id} />;
}
