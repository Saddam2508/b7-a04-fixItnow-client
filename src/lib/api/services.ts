import type { ServiceInput } from "@/components/technician/services/serviceTypes";

import { protectedFetch, serverFetch, serverMutation } from "../core/server";

export const servicesApi = {
  getMine: () => protectedFetch("/api/services/my-services"),

  getById: (id: string) => protectedFetch(`/api/services/${id}`),

  getCategories: () => serverFetch("/api/categories"),

  create: (data: ServiceInput) => serverMutation("/api/services", data, "POST"),

  update: (id: string, data: ServiceInput) =>
    serverMutation(`/api/services/${id}`, data, "PATCH"),

  delete: (id: string) =>
    serverMutation(`/api/technician/services/${id}`, {}, "DELETE"),
};
