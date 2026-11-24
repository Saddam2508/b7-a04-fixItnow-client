
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  House,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  Zap,
  Droplets,
  Brush,
} from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const services = [
  {
    name: "Plumbing",
    description: "Pipes, leaks & repairs",
    icon: Droplets,
    color: "bg-sky-50 text-sky-600",
    search: "Plumbing",
  },
  {
    name: "Electrical",
    description: "Wiring & installations",
    icon: Zap,
    color: "bg-amber-50 text-amber-600",
    search: "Electrical",
  },
  {
    name: "Cleaning",
    description: "Fresh & spotless spaces",
    icon: Brush,
    color: "bg-emerald-50 text-emerald-600",
    search: "Cleaning",
  },
  {
    name: "AC Repair",
    description: "Cooling & maintenance",
    icon: Wrench,
    color: "bg-violet-50 text-violet-600",
    search: "AC Repair",
  },
];

export default function FixItNowBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -right-40 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-sky-200/30 blur-3xl" />

      {/* Hero section */}
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        {/* Left content */}
        <div className="max-w-2xl">
          <Badge className="mb-6 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
            <Sparkles className="mr-2 h-4 w-4" />
            Your Home, Our Priority
          </Badge>

          <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Home Services,
            <span className="block text-blue-600">
              Made Simple.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            From everyday repairs to essential home maintenance, find
            trusted professionals and book quality services with just
            a few clicks. Your home deserves the best.
          </p>

          {/* Search */}
          <form
            action="/services"
            method="GET"
            className="mt-9 flex max-w-xl flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-xl shadow-blue-100/50 sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 shrink-0 text-blue-600" />
              <Input
                name="search"
                placeholder="What service do you need?"
                aria-label="Search home services"
                className="h-12 border-0 bg-transparent text-sm shadow-none placeholder:text-slate-400 focus-visible:ring-0"
              />
            </div>

            <Button
              type="submit"
              className="h-12 rounded-xl bg-blue-600 px-7 font-semibold shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              Find Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {/* Trust features */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Feature
              icon={<BadgeCheck className="h-5 w-5" />}
              title="Verified Professionals"
              description="Connect with trusted service experts"
              color="bg-blue-100 text-blue-700"
            />

            <Feature
              icon={<CalendarCheck className="h-5 w-5" />}
              title="Easy Booking"
              description="Book services at your convenience"
              color="bg-emerald-100 text-emerald-700"
            />

            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Secure Experience"
              description="A safer and more reliable process"
              color="bg-violet-100 text-violet-700"
            />

            <Feature
              icon={<Clock3 className="h-5 w-5" />}
              title="Save Your Time"
              description="Get home services without the hassle"
              color="bg-amber-100 text-amber-700"
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Simple
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>Reliable</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>Convenient</span>
          </div>
        </div>

        {/* Right side illustration */}
        <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
          <div className="absolute inset-10 rounded-full bg-blue-300/30 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-4 shadow-2xl shadow-blue-200/50 sm:p-6">
            {/* Dashboard header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-200">
                  <Wrench className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-lg font-extrabold tracking-tight text-slate-900">
                    FixIt<span className="text-blue-600">Now</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Home services made easy
                  </p>
                </div>
              </div>

              <Badge
                variant="outline"
                className="rounded-full border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700"
              >
                <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500" />
                Trusted Platform
              </Badge>
            </div>

            {/* Main promotional card */}
            <div className="relative mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-6 text-white sm:p-8">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[30px] border-white/5" />
              <div className="absolute -bottom-20 -right-5 h-48 w-48 rounded-full bg-blue-400/20 blur-2xl" />

              <div className="relative z-10">
                <Badge className="border border-white/20 bg-white/10 text-blue-100 hover:bg-white/10">
                  <House className="mr-2 h-3.5 w-3.5" />
                  COMPLETE HOME CARE
                </Badge>

                <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                  Your Home.
                  <br />
                  Our Expertise.
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-7 text-blue-100">
                  Quality home services from skilled professionals.
                  Discover the easier way to care for your home.
                </p>

                <Link
                  href="/services"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  Explore Services
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Popular services */}
            <div className="mt-7">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Explore Popular Services
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Find the right help for your home
                  </p>
                </div>

                <Link
                  href="/services"
                  className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <Link
                      href={`/services?search=${encodeURIComponent(service.search)}`}
                      key={service.name}
                      className="group rounded-2xl border border-slate-100 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50"
                    >
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${service.color} transition group-hover:scale-105`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <p className="mt-3 text-sm font-bold text-slate-900">
                        {service.name}
                      </p>

                      <p className="mt-1 text-[11px] leading-4 text-slate-500">
                        {service.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Technician information */}
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <Wrench className="h-6 w-6" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-slate-900">
                      Skilled Technicians
                    </p>
                    <BadgeCheck className="h-4 w-4 text-blue-600" />
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Professional help, right at home
                  </p>
                </div>
              </div>

              <Link
                href="/services"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Book Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Floating trust card */}
          <div className="absolute -left-5 top-[27%] hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/60 sm:block">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Quality First
                </p>
                <p className="text-xs text-slate-500">
                  Trusted home care
                </p>
              </div>
            </div>
          </div>

          {/* Floating rating card */}
          <div className="absolute -right-3 bottom-[17%] hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/60 sm:block">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
                <Star className="h-5 w-5 fill-amber-500" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Customer First
                </p>
                <p className="text-xs text-slate-500">
                  Service you can trust
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform roles */}
      <div className="border-t border-slate-200/70 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8">
          <Role
            icon={<Search className="h-5 w-5" />}
            title="For Customers"
            description="Discover services and manage bookings"
            color="bg-blue-100 text-blue-700"
          />

          <Role
            icon={<Wrench className="h-5 w-5" />}
            title="For Technicians"
            description="Manage services and grow your work"
            color="bg-violet-100 text-violet-700"
          />

          <Role
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Platform Administration"
            description="Manage users and oversee operations"
            color="bg-emerald-100 text-emerald-700"
          />
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  description,
  color,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function Role({
  icon,
  title,
  description,
  color,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className={`rounded-2xl p-3 ${color}`}>
        {icon}
      </div>

      <div>
        <p className="font-bold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}
