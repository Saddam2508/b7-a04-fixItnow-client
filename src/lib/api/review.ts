import { protectedFetch, serverMutation } from "@/lib/core/server";

export const reviewApi = {
  getAll: (technicianId?: string) =>
    protectedFetch(
      technicianId
        ? `/api/reviews?technicianId=${encodeURIComponent(technicianId)}`
        : "/api/reviews",
    ),

  getMyReviews: () => protectedFetch("/api/reviews/my-reviews"),

  create: (data: {
    bookingId: string;
    technicianId: string;
    rating: number;
    comment?: string;
  }) => serverMutation("/api/reviews", data, "POST"),

  update: (id: string, data: { rating?: number; comment?: string }) =>
    serverMutation(`/api/reviews/${id}`, data, "PATCH"),

  delete: (id: string) => serverMutation(`/api/reviews/${id}`, {}, "DELETE"),
};
