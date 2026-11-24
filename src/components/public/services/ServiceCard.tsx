import Link from "next/link";
import { MapPin, Star, UserRound, Wrench, ArrowRight } from "lucide-react";

import type { PublicService } from "./publicServiceTypes";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BookNowButton from "./BookNowButton";

interface ServiceCardProps {
  service: PublicService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const technician = service.technician;

  return (
    <Card className="h-full overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <Wrench className="h-6 w-6" />
          </div>

          <Badge variant="secondary">
            {service.category?.name || "General"}
          </Badge>
        </div>

        <h2 className="mt-4 text-lg font-bold">{service.title}</h2>

        <p className="mt-2 line-clamp-3 min-h-14 text-sm text-muted-foreground">
          {service.description || "Professional home service."}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ৳{service.price.toLocaleString("en-BD")}
          </span>

          <div className="flex items-center gap-1 text-sm text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span>{Number(technician?.avgRating ?? 0).toFixed(1)}</span>
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserRound className="h-4 w-4" />
            <span className="truncate">
              {technician?.user?.name || "Technician"}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{technician?.location || "Location unavailable"}</span>
          </div>
        </div>

        <div className="mt-auto pt-5">
          {technician?.id ? (
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/technicians/${service.technician.id}`}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium"
              >
                View Profile
              </Link>

              <BookNowButton
                serviceId={service.id}
                technicianId={service.technician.id}
              />
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">
              Technician profile unavailable
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
