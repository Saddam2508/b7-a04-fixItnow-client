import type { ServiceInput } from "@/components/technician/services/serviceTypes";

import { protectedFetch, serverFetch, serverMutation } from "../core/server";
import { PublicServiceFilters } from "@/components/public/services/publicServiceTypes";

export const servicesApi = {
  getMine: () => protectedFetch("/api/services/my-services"),

  getById: (id: string) => protectedFetch(`/api/services/${id}`),

  getCategories: () => serverFetch("/api/categories"),

  create: (data: ServiceInput) => serverMutation("/api/services", data, "POST"),

  update: (id: string, data: ServiceInput) =>
    serverMutation(`/api/services/${id}`, data, "PATCH"),

  delete: (id: string) =>
    serverMutation(`/api/technician/services/${id}`, {}, "DELETE"),
  getAll: (filters?: PublicServiceFilters) => {
    const params = new URLSearchParams();

    if (filters?.search) params.set("search", filters.search);
    if (filters?.type) params.set("type", filters.type);
    if (filters?.location) params.set("location", filters.location);
    if (filters?.rating !== undefined) {
      params.set("rating", String(filters.rating));
    }
    if (filters?.minPrice !== undefined) {
      params.set("minPrice", String(filters.minPrice));
    }
    if (filters?.maxPrice !== undefined) {
      params.set("maxPrice", String(filters.maxPrice));
    }

    const query = params.toString();

    return serverFetch(`/api/services${query ? `?${query}` : ""}`);
  },
};
