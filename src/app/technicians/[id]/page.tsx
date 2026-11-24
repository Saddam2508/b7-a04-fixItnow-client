import { notFound } from "next/navigation";

import { getPublicTechnicianAction } from "@/lib/actions/technician";
import TechnicianProfile from "@/components/public/technicians/TechnicianProfile";

import type { PublicTechnician } from "@/components/public/technicians/technicianTypes";

interface TechnicianPageProps {
  params: Promise<{
    id: string;
  }>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export default async function PublicTechnicianPage({
  params,
}: TechnicianPageProps) {
  const { id } = await params;

  if (!id) notFound();

  const result: unknown = await getPublicTechnicianAction(id);

  if (!isRecord(result) || result.success !== true) {
    notFound();
  }

  const data = result.data;

  if (!isRecord(data) || !isRecord(data.technician)) {
    notFound();
  }

  const rawTechnician = data.technician;

  if (typeof rawTechnician.id !== "string" || rawTechnician.id !== id) {
    notFound();
  }

  const technician = {
    ...rawTechnician,
    services: Array.isArray(rawTechnician.services)
      ? rawTechnician.services
      : [],
    reviews: Array.isArray(rawTechnician.reviews) ? rawTechnician.reviews : [],
    availability: Array.isArray(rawTechnician.availability)
      ? rawTechnician.availability
      : [],
  } as unknown as PublicTechnician;

  return <TechnicianProfile technician={technician} />;
}
