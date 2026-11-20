import { protectedFetch, serverFetch, serverMutation } from "../core/server";

import type { CustomerProfileInput } from "@/components/customer/profile/customerProfileTypes";

export const userApi = {
  getMyProfile: () => protectedFetch("/api/auth/me"),

  updateMyProfile: (data: CustomerProfileInput) =>
    serverMutation("/api/auth/my-profile", data, "PUT"),

  getTopFreelancers: () => serverFetch("/api/users/freelancers/top?limit=6"),
};
