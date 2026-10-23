import type { ServiceInput } from "@/components/services/serviceTypes";

import { protectedFetch, serverFetch, serverMutation } from "../core/server";

export const servicesApi = {
  getMine: () => protectedFetch("/api/technician/services"),

  getById: (id: string) => protectedFetch(`/api/technician/services/${id}`),

  getCategories: () => serverFetch("/api/categories"),

  create: (data: ServiceInput) =>
    serverMutation("/api/technician/services", data, "POST"),

  update: (id: string, data: ServiceInput) =>
    serverMutation(`/api/technician/services/${id}`, data, "PATCH"),

  delete: (id: string) =>
    serverMutation(`/api/technician/services/${id}`, {}, "DELETE"),
};
