"use server";

import { servicesApi } from "@/lib/api/services";
import { technicianApi } from "@/lib/api/technician";
import type { PublicServiceFilters } from "@/components/public/services/publicServiceTypes";

export async function getPublicServicesAction(filters?: PublicServiceFilters) {
  return servicesApi.getAll(filters);
}

export async function getPublicCategoriesAction() {
  return servicesApi.getCategories();
}

export async function getPublicTechniciansAction() {
  return technicianApi.getAll();
}
