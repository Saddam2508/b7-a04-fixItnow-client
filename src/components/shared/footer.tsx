
import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  Mail,
  MapPin,
  ShieldCheck,
  Clock3,
  Heart,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { name: "Plumbing", href: "/services?search=Plumbing" },
  { name: "Electrical", href: "/services?search=Electrical" },
  { name: "Home Cleaning", href: "/services?search=Cleaning" },
  { name: "AC Repair", href: "/services?search=AC%20Repair" },
];

const supportLinks = [
  { name: "Help Center", href: "/contact" },
  { name: "FAQs", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* Newsletter section */}
        <div className="border-b border-white/10 py-12 lg:py-14">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Stay Connected
              </span>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Your home deserves
                <span className="text-blue-400"> the best.</span>
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Discover reliable home services and make your everyday
                life easier with FixItNow.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Explore Our Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="rounded-xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-900/30">
                <Wrench className="h-6 w-6" />
              </div>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                FixIt<span className="text-blue-400">Now</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Your trusted destination for professional home services.
              We connect you with skilled technicians to make home
              maintenance simple, convenient and hassle-free.
            </p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Trusted Services
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300">
                <Clock3 className="h-4 w-4 text-blue-400" />
                Easy Booking
              </div>
            </div>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-3">
  <SocialLink
    href="https://www.facebook.com/"
    label="Facebook"
    icon={<FaFacebookF className="h-4 w-4" />}
  />

  <SocialLink
    href="https://www.instagram.com/"
    label="Instagram"
    icon={<FaInstagram className="h-4 w-4" />}
  />

  <SocialLink
    href="https://www.linkedin.com/"
    label="LinkedIn"
    icon={<FaLinkedinIn className="h-4 w-4" />}
  />

  <SocialLink
    href="https://x.com/"
    label="X"
    icon={<FaXTwitter className="h-4 w-4" />}
  />
</div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <FooterLink
                  key={link.name}
                  name={link.name}
                  href={link.href}
                />
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-bold text-white">
              Popular Services
            </h3>

            <ul className="mt-6 space-y-4">
              {serviceLinks.map((link) => (
                <FooterLink
                  key={link.name}
                  name={link.name}
                  href={link.href}
                />
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base font-bold text-white">
              Support
            </h3>

            <ul className="mt-6 space-y-4">
              {supportLinks.map((link) => (
                <FooterLink
                  key={link.name}
                  name={link.name}
                  href={link.href}
                />
              ))}
            </ul>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <span className="text-sm text-slate-400">
                  Contact us through our support page
                </span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <span className="text-sm text-slate-400">
                  Home services at your convenience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-sm text-slate-500 sm:text-left">
            © {new Date().getFullYear()} FixItNow. All rights reserved.
          </p>

          <p className="flex items-center justify-center gap-1.5 text-sm text-slate-500">
            Made with
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            for better homes
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Footer navigation link */
function FooterLink({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-400"
      >
        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
        {name}
      </Link>
    </li>
  );
}

/* Social media link */
function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
    >
      {icon}
    </a>
  );
}
