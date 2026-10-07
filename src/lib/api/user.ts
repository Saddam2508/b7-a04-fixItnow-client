import { serverFetch } from "../core/server";

export const getTopFreelancers = async () => {
  return serverFetch("/api/users/freelancers/top?limit=6");
};
