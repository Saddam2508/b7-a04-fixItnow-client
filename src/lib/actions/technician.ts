"use server";

import { technicianApi } from "@/lib/api/technician";
import type { TechnicianProfileInput } from "@/components/technician/profile/profileTypes";

export async function getTechnicianProfileAction() {
  return technicianApi.getProfile();
}

export async function updateTechnicianProfileAction(
  id: string,
  data: TechnicianProfileInput,
) {
  return technicianApi.updateProfile(id, data);
}
