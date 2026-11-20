import type {
  Service,
  ServiceCategory,
} from "@/components/technician/services/serviceTypes";

export interface PublicTechnicianUser {
  id: string;
  name: string;
  email: string;
  profile?: {
    profilePhoto: string | null;
  } | null;
}

export interface PublicTechnician {
  id: string;
  userId: string;
  bio: string | null;
  skills: string[];
  experience: number;
  hourlyRate: number;
  location: string | null;
  avgRating: number;
  user: PublicTechnicianUser;
}

export interface PublicService extends Service {
  technician: PublicTechnician;
}

export interface PublicServiceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    services: PublicService[];
  };
}

export interface PublicCategoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    serviceCategories: ServiceCategory[];
  };
}

export interface PublicTechnicianResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    technicians: PublicTechnician[];
  };
}

export interface PublicServiceFilters {
  search?: string;
  type?: string;
  location?: string;
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
}
