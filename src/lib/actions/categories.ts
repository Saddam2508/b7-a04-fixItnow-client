"use server";

import { categoriesApi } from "@/lib/api/categories";
import type { CategoryInput } from "@/components/admin/categories/categoryTypes";

export async function getCategoriesAction() {
  return categoriesApi.getAll();
}

export async function createCategoryAction(data: CategoryInput) {
  return categoriesApi.create(data);
}

export async function updateCategoryAction(id: string, data: CategoryInput) {
  return categoriesApi.update(id, data);
}

export async function deleteCategoryAction(id: string) {
  return categoriesApi.delete(id);
}
