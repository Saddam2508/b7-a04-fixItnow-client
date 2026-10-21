import Link from "next/link";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  CalendarDays,
  Wrench,
  Star,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const services = [
  { name: "Plumbing", icon: "🔧", price: "From $50" },
  { name: "Electrical", icon: "⚡", price: "From $45" },
  { name: "Cleaning", icon: "🧹", price: "From $35" },
  { name: "AC Repair", icon: "❄️", price: "From $60" },
];

export default function FixItNowBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-sky-100/70">
      {/* Background decoration */}
      <div className="absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* Left content */}
        <div>
          <Badge className="mb-6 rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-100">
            <Wrench className="mr-2 h-4 w-4" />
            Assignment 5 · Next.js Frontend
          </Badge>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find. Book.
            <span className="block text-blue-600">Get It Done.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
            Your trusted home service platform to find skilled professionals for
            all your home service needs. Fast, reliable, and hassle-free.
          </p>

          {/* Service search */}
          <form
            action="/services"
            method="GET"
            className="mt-8 flex max-w-xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-blue-100/60 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-2 px-2">
              <Search className="h-5 w-5 shrink-0 text-blue-600" />
              <Input
                name="search"
                placeholder="What service do you need?"
                aria-label="Search services"
                className="border-0 shadow-none focus-visible:ring-0"
              />
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Search <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {/* Features */}
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-7">
            <Feature
              icon={<Search className="h-5 w-5" />}
              title="Find Services"
              description="Explore a wide range of home services"
              color="bg-emerald-100 text-emerald-600"
            />

            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Verified Technicians"
              description="Skilled and trusted professionals"
              color="bg-blue-100 text-blue-600"
            />

            <Feature
              icon={<CalendarDays className="h-5 w-5" />}
              title="Easy Booking"
              description="Choose your preferred time"
              color="bg-violet-100 text-violet-600"
            />

            <Feature
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Secure Payments"
              description="Safe and trusted checkout"
              color="bg-amber-100 text-amber-600"
            />
          </div>

          <p className="mt-10 text-lg font-bold text-blue-700">
            Better Homes <span className="px-1">→</span> Happier Lives
          </p>
        </div>

        {/* Right dashboard illustration */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-8 rounded-full bg-blue-300/40 blur-3xl" />

          <div className="relative rounded-3xl border border-blue-100 bg-white p-4 shadow-2xl shadow-blue-200/60 sm:p-6">
            {/* Dashboard top */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-blue-600 p-2.5 text-white">
                  <Wrench className="h-5 w-5" />
                </div>
                <span className="font-bold text-slate-900">
                  FixIt<span className="text-blue-600">Now</span>
                </span>
              </div>

              <Badge variant="outline" className="text-emerald-600">
                Trusted Services
              </Badge>
            </div>

            {/* Hero card */}
            <div className="mt-4 rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-5 text-white sm:p-7">
              <p className="text-sm font-medium text-blue-200">
                HOME SERVICES, MADE EASY
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
                Professional Help.
                <br />
                Right at Home.
              </h2>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                Find reliable technicians for your home repairs and maintenance.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-xl bg-white p-3 text-slate-500">
                <Search className="h-5 w-5 text-blue-600" />
                <span className="flex-1 text-sm">Search home services...</span>
                <ArrowRight className="h-5 w-5 text-blue-600" />
              </div>
            </div>

            {/* Services */}
            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Popular Services</h3>
                <Link
                  href="/services"
                  className="text-sm font-medium text-blue-600"
                >
                  View all →
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {services.map((service) => (
                  <Link
                    href="/services"
                    key={service.name}
                    className="rounded-xl border border-slate-100 p-3 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
                      {service.icon}
                    </span>
                    <p className="mt-3 text-sm font-semibold text-slate-900">
                      {service.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {service.price}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Technician */}
            <div className="mt-5 flex flex-col gap-4 rounded-2xl border bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <Wrench className="h-6 w-6" />
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Verified Technician
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>4.9 Rating</span>
                  </div>
                </div>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">
                <Link href="/services">
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Floating card */}
          <div className="absolute -left-4 top-1/3 hidden rounded-2xl border bg-white p-4 shadow-xl sm:block">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Quality Service
            </div>
            <p className="mt-2 text-xs text-slate-500">Skilled professionals</p>
          </div>
        </div>
      </div>

      {/* Platform roles */}
      <div className="border-t border-blue-100 bg-white/80">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:grid-cols-3 lg:px-8">
          <Role
            icon={<Search className="h-5 w-5" />}
            title="Customer"
            description="Book services & track jobs"
            color="bg-blue-100 text-blue-700"
          />

          <Role
            icon={<Wrench className="h-5 w-5" />}
            title="Technician"
            description="Manage services & bookings"
            color="bg-violet-100 text-violet-700"
          />

          <Role
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Admin"
            description="Manage users & categories"
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
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
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
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`rounded-xl p-3 ${color}`}>{icon}</div>
      <div>
        <p className="font-bold text-slate-900">{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}
