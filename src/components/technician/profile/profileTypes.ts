// ============================================
// Availability Types
// ============================================

export interface TechnicianAvailability {
  id: string;
  technicianId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface TechnicianAvailabilityInput {
  id?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

// ============================================
// Service Types
// ============================================

export interface TechnicianService {
  id: string;
  name: string;
}

// ============================================
// User Profile Types
// ============================================

export interface TechnicianUserProfile {
  id: string;
  profilePhoto: string | null;
}

export interface TechnicianUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  profile?: TechnicianUserProfile | null;
}

// ============================================
// Technician Profile API Response
// ============================================

export interface TechnicianProfileFormData {
  id: string;
  userId: string;

  bio: string | null;
  skills: string[];
  experience: number;
  hourlyRate: number;
  location: string | null;
  avgRating: number;

  // Form state-এ Input type ব্যবহার হবে
  availability: TechnicianAvailabilityInput[];

  services: TechnicianService[];

  user: TechnicianUser;

  createdAt: string;
  updatedAt: string;
}

// ============================================
// Technician Profile Update Input
// ============================================

export interface TechnicianProfileInput {
  bio: string | null;
  skills: string[];
  experience: number;
  hourlyRate: number;
  location: string | null;

  availability: TechnicianAvailabilityInput[];
}

// ============================================
// Technician Profile API Response Wrapper
// ============================================

export interface TechnicianProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    technicians: TechnicianProfileFormData[];
  };
}
