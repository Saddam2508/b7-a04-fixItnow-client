export interface ServiceCategory {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  services?: unknown[];
}

export interface CategoryInput {
  name: string;
  description?: string;
}
