"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import type { PublicService } from "./publicServiceTypes";

import type { ServiceCategory } from "@/components/technician/services/serviceTypes";

import ServiceCard from "./ServiceCard";

interface ServicesPageProps {
  services: PublicService[];
  categories: ServiceCategory[];
  initialType?: string;
}

export default function ServicesPage({
  services,
  categories,
  initialType = "",
}: ServicesPageProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialType);
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("0");

  const filteredServices = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();
    const minimumRating = Number(rating);

    return services.filter((service) => {
      const matchesSearch =
        !normalizedSearch ||
        service.title.toLowerCase().includes(normalizedSearch) ||
        (service.description ?? "").toLowerCase().includes(normalizedSearch);

      const matchesCategory = !category || service.category?.name === category;

      const matchesLocation =
        !normalizedLocation ||
        (service.technician?.location ?? "")
          .toLowerCase()
          .includes(normalizedLocation);

      const matchesRating =
        Number(service.technician?.avgRating ?? 0) >= minimumRating;

      return (
        matchesSearch && matchesCategory && matchesLocation && matchesRating
      );
    });
  }, [services, search, category, location, rating]);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setRating("0");
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Page Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            FixItNow Services
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Find the Right Service for Your Home
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Explore professional home services and find a technician you can
            trust.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-blue-600" />
            <h2 className="font-semibold">Find Your Service</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div>
              <label
                htmlFor="service-search"
                className="mb-2 block text-sm font-medium"
              >
                Search Service
              </label>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="service-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search services..."
                  className="h-11 w-full rounded-lg border bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="service-category"
                className="mb-2 block text-sm font-medium"
              >
                Category
              </label>

              <select
                id="service-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All Categories</option>

                {categories.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="service-location"
                className="mb-2 block text-sm font-medium"
              >
                Location
              </label>

              <input
                id="service-location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter location..."
                className="h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Rating */}
            <div>
              <label
                htmlFor="service-rating"
                className="mb-2 block text-sm font-medium"
              >
                Minimum Rating
              </label>

              <select
                id="service-rating"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                className="h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="0">All Ratings</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Available Services</h2>

          <p className="text-sm text-muted-foreground">
            {filteredServices.length} services found
          </p>
        </div>

        {filteredServices.length === 0 ? (
          <div className="rounded-2xl border bg-white px-5 py-16 text-center">
            <Search className="mx-auto h-10 w-10 text-slate-300" />

            <h3 className="mt-4 text-lg font-semibold">No Services Found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
