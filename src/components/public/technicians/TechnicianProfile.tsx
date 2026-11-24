import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MapPin,
  Star,
  Wrench,
} from "lucide-react";

import type { PublicTechnician } from "./technicianTypes";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TechnicianReviews from "./TechnicianReviews";

interface TechnicianProfileProps {
  technician: PublicTechnician;
}

export default function TechnicianProfile({
  technician,
}: TechnicianProfileProps) {
  const name = technician.user?.name || "Technician";
  const initial = name.charAt(0).toUpperCase();
  const services = technician.services ?? [];
  const reviews = technician.reviews ?? [];
  const skills = technician.skills ?? [];

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Link>

        {/* Profile Header */}
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="h-36 bg-gradient-to-r from-blue-700 to-indigo-500" />

          <CardContent className="relative px-6 pb-7">
            <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                {technician.user?.profile?.profilePhoto ? (
                  <div
                    role="img"
                    aria-label={`${name}'s profile`}
                    className="h-28 w-28 rounded-2xl border-4 border-white bg-cover bg-center shadow-md"
                    style={{
                      backgroundImage: `url("${technician.user.profile.profilePhoto}")`,
                    }}
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-4xl font-bold text-blue-700 shadow-md">
                    {initial}
                  </div>
                )}

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                      {name}
                    </h1>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      Professional Technician
                    </Badge>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {technician.location || "Location not provided"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {Number(technician.avgRating || 0).toFixed(1)} Rating
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {technician.bio && (
              <div className="mt-7 border-t pt-5">
                <h2 className="font-semibold text-slate-900">About</h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {technician.bio}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={<BriefcaseBusiness className="h-5 w-5" />}
            label="Experience"
            value={`${technician.experience} Years`}
          />

          <StatCard
            icon={<Wrench className="h-5 w-5" />}
            label="Total Services"
            value={String(services.length)}
          />

          <StatCard
            icon={<Star className="h-5 w-5" />}
            label="Average Rating"
            value={`${Number(technician.avgRating || 0).toFixed(1)} / 5`}
          />
        </div>

        {/* Skills and Rate */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Professional Skills
              </h2>

              {skills.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={`${skill}-${index}`}
                      variant="secondary"
                      className="px-3 py-2"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  No skills added yet.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Hourly Rate</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                ৳{Number(technician.hourlyRate).toLocaleString("en-BD")}
              </p>
              <p className="mt-1 text-sm text-slate-500">Per hour</p>
            </CardContent>
          </Card>
        </div>

        {/* Services */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                WHAT I OFFER
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Services
              </h2>
            </div>

            <span className="text-sm text-slate-500">
              {services.length} Services
            </span>
          </div>

          {services.length === 0 ? (
            <EmptyMessage message="This technician has not published any services yet." />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card key={service.id} className="transition hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                        <Wrench className="h-5 w-5" />
                      </div>

                      {service.category?.name && (
                        <Badge variant="secondary">
                          {service.category.name}
                        </Badge>
                      )}
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      {service.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 min-h-12 text-sm text-slate-500">
                      {service.description || "Professional service"}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t pt-4">
                      <span className="text-xl font-bold text-blue-600">
                        ৳{Number(service.price).toLocaleString("en-BD")}
                      </span>

                      <Link
                        href="/services"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Explore
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Availability */}
        {technician.availability?.length > 0 && (
          <section>
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              Availability
            </h2>

            <Card>
              <CardContent className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
                {technician.availability.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center gap-3 rounded-lg bg-slate-50 p-4"
                  >
                    <CalendarDays className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        {getWeekDay(slot.dayOfWeek)}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <Clock3 className="h-3.5 w-3.5" />
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        )}

        {/* Reviews */}
        <TechnicianReviews reviews={reviews} />
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">{icon}</div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyMessage({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed bg-white p-8 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}

function getWeekDay(day: number): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day] ?? `Day ${day}`;
}
