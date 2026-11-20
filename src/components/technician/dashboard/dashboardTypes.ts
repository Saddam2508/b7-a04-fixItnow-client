export interface TechnicianDashboardStats {
  totalServices: number;
  pendingRequests: number;
  upcomingJobs: number;
  completedJobs: number;
  totalEarnings: number;
}

export interface TechnicianDashboardStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    stats: TechnicianDashboardStats;
  };
}
