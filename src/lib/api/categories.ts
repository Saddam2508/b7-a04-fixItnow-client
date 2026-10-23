import { protectedFetch, serverMutation, serverFetch } from "@/lib/core/server";

import type { CategoryInput } from "@/components/admin/categories/categoryTypes";

export const categoriesApi = {
  getAll: () => serverFetch("/api/categories"),

  getById: (id: string) => serverFetch(`/api/categories/${id}`),

  create: (data: CategoryInput) =>
    serverMutation("/api/categories", data, "POST"),

  update: (id: string, data: CategoryInput) =>
    serverMutation(`/api/categories/${id}`, data, "PATCH"),

  delete: (id: string) => serverMutation(`/api/categories/${id}`, {}, "DELETE"),
};
