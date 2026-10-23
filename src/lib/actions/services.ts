"use server";

import { servicesApi } from "@/lib/api/services";
import type { ServiceInput } from "@/components/services/serviceTypes";

export async function getMyServicesAction() {
  return servicesApi.getMine();
}

export async function getServiceByIdAction(id: string) {
  return servicesApi.getById(id);
}

export async function getCategoriesAction() {
  return servicesApi.getCategories();
}

export async function createServiceAction(data: ServiceInput) {
  return servicesApi.create(data);
}

export async function updateServiceAction(id: string, data: ServiceInput) {
  return servicesApi.update(id, data);
}

export async function deleteServiceAction(id: string) {
  return servicesApi.delete(id);
}
