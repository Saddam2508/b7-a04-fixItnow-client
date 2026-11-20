"use server";

import { reviewApi } from "@/lib/api/review";

export async function getReviewsAction(technicianId?: string) {
  return reviewApi.getAll(technicianId);
}

export async function getMyReviewsAction() {
  return reviewApi.getMyReviews();
}

export async function createReviewAction(data: {
  bookingId: string;
  technicianId: string;
  rating: number;
  comment?: string;
}) {
  return reviewApi.create(data);
}

export async function updateReviewAction(
  id: string,
  data: { rating?: number; comment?: string },
) {
  return reviewApi.update(id, data);
}

export async function deleteReviewAction(id: string) {
  return reviewApi.delete(id);
}
