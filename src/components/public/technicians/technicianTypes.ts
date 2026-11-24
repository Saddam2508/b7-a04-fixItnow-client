import type { Review } from "@/components/customer/reviews/reviewTypes";
import type { TechnicianProfileFormData } from "@/components/technician/profile/profileTypes";
import type { Service } from "@/components/technician/services/serviceTypes";

export interface PublicTechnician extends Omit<
  TechnicianProfileFormData,
  "services"
> {
  services: Service[];
  reviews?: Review[];
}

export interface PublicTechnicianResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    technician: PublicTechnician;
  };
}
