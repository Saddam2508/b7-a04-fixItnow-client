import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  Star,
  Tags,
  Wrench,
} from "lucide-react";

import {
  getPublicCategoriesAction,
  getPublicServicesAction,
  getPublicTechniciansAction,
} from "@/lib/actions/public";

import type {
  PublicService,
  PublicTechnician,
} from "@/components/public/services/publicServiceTypes";

import type { ServiceCategory } from "@/components/technician/services/serviceTypes";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function extractList<T>(result: unknown, key: string): T[] {
  if (!result || typeof result !== "object") return [];

  const response = result as Record<string, unknown>;

  if (response.success === false) return [];

  const data = response.data;

  if (!data || typeof data !== "object") return [];

  const list = (data as Record<string, unknown>)[key];

  return Array.isArray(list) ? (list as T[]) : [];
}

export default async function HomeSections() {
  const [serviceResult, categoryResult, technicianResult] = await Promise.all([
    getPublicServicesAction(),
    getPublicCategoriesAction(),
    getPublicTechniciansAction(),
  ]);

  const services = extractList<PublicService>(serviceResult, "services");
  const categories = extractList<ServiceCategory>(
    categoryResult,
    "serviceCategories",
  );
  const technicians = extractList<PublicTechnician>(
    technicianResult,
    "technicians",
  );

  const featuredServices = [...services]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 6);

  const topTechnicians = [...technicians]
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 4);

  return (
    <div className="space-y-16 py-16">
      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-600">
              <Tags className="h-5 w-5" />
              <span className="text-sm font-semibold">Categories</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Explore Our Categories
            </h2>
          </div>

          <Link
            href="/services"
            className="text-sm font-semibold text-blue-600"
          >
            All Services <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </div>

        {categories.length === 0 ? (
          <p className="rounded-xl border p-6 text-center text-muted-foreground">
            No categories available right now.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/services?type=${encodeURIComponent(category.name)}`}
              >
                <Card className="h-full transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
                  <CardContent className="flex items-center gap-3 p-5">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">
                        {category.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {category.description || "Explore services"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Services */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              FEATURED SERVICES
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Popular Home Services
            </h2>
          </div>

          <Link
            href="/services"
            className="text-sm font-semibold text-blue-600"
          >
            View All <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </div>

        {featuredServices.length === 0 ? (
          <p className="rounded-xl border p-6 text-center text-muted-foreground">
            No services available right now.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <Card
                key={service.id}
                className="overflow-hidden transition hover:shadow-lg"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                      <Wrench className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary">
                      {service.category?.name || "General"}
                    </Badge>
                  </div>

                  <h3 className="mt-4 text-lg font-bold">{service.title}</h3>

                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {service.description || "Professional home service."}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      ৳{service.price.toLocaleString("en-BD")}
                    </span>
                    <Link
                      href={`/services`}
                      className="text-sm font-semibold text-blue-600"
                    >
                      Explore <ArrowRight className="ml-1 inline h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Top Technicians */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-7">
          <p className="text-sm font-semibold text-blue-600">
            OUR PROFESSIONALS
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Top-Rated Technicians
          </h2>
        </div>

        {topTechnicians.length === 0 ? (
          <p className="rounded-xl border p-6 text-center text-muted-foreground">
            No technicians available right now.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topTechnicians.map((technician) => (
              <Card key={technician.id}>
                <CardContent className="p-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                    {technician.user.name.slice(0, 1).toUpperCase()}
                  </div>

                  <h3 className="mt-4 font-bold">{technician.user.name}</h3>

                  <div className="mt-2 flex items-center gap-1 text-sm text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    {technician.avgRating.toFixed(1)}
                  </div>

                  <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {technician.location || "Location unavailable"}
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {technician.experience} years experience
                  </p>

                  <Link
                    href={`/technicians/${technician.id}`}
                    className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600"
                  >
                    View Profile <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
