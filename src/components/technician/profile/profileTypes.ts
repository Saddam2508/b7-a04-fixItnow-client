export interface TechnicianProfileInput {
  id: string;
  userId: string;
  bio: string | null;
  skills: string[];
  experience: number;
  hourlyRate: number;
  location: string | null;
  avgRating: number;
  user: {
    id: string;
    name: string;
    email: string;
    profile?: {
      id: string;
      profilePhoto: string | null;
    } | null;
  };
}

export interface TechnicianProfileFormData {
  name: string;
  profilePhoto: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
  location: string;
  bio: string;
}
