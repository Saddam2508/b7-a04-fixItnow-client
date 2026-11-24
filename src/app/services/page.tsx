import ServicesPage from "@/components/public/services/ServicesPage";

import {
  getPublicCategoriesAction,
  getPublicServicesAction,
} from "@/lib/actions/public";

import type { PublicService } from "@/components/public/services/publicServiceTypes";
import type { ServiceCategory } from "@/components/technician/services/serviceTypes";

interface ServicesRouteProps {
  searchParams: Promise<{
    type?: string;
  }>;
}

function extractList<T>(result: unknown, key: string): T[] {
  if (!result || typeof result !== "object") return [];

  const response = result as Record<string, unknown>;

  if (response.success === false) return [];

  const data = response.data;

  if (!data || typeof data !== "object") return [];

  const list = (data as Record<string, unknown>)[key];

  return Array.isArray(list) ? (list as T[]) : [];
}

export default async function ServicesRoute({
  searchParams,
}: ServicesRouteProps) {
  const params = await searchParams;

  const [serviceResult, categoryResult] = await Promise.all([
    getPublicServicesAction(),
    getPublicCategoriesAction(),
  ]);

  const services = extractList<PublicService>(serviceResult, "services");

  const categories = extractList<ServiceCategory>(
    categoryResult,
    "serviceCategories",
  );

  return (
    <ServicesPage
      services={services}
      categories={categories}
      initialType={params.type ?? ""}
    />
  );
}
