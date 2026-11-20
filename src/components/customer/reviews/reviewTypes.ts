export type ReviewStatus = "PENDING" | "COMPLETED";

export interface ReviewCustomer {
  id: string;
  name: string;
  email: string;
}

export interface ReviewTechnician {
  id: string;
  user?: {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
  };
}

export interface ReviewService {
  id: string;
  title: string;
}

export interface ReviewBooking {
  id: string;
  status: string;
  service: ReviewService;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  customer?: ReviewCustomer;
  technician?: ReviewTechnician;
  booking?: ReviewBooking;
}

export interface CreateReviewInput {
  bookingId: string;
  technicianId: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewInput {
  rating?: number;
  comment?: string;
}

export interface ReviewApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface MyReviewsResponse {
  reviews: Review[];
}

export interface SingleReviewResponse {
  review: Review;
}
