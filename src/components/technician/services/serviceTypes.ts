export interface ServiceCategory {
  id: string;
  name: string;
  description?: string | null;
}

export interface Service {
  id: string;
  technicianId: string;
  categoryId: string;
  category?: ServiceCategory;
  title: string;
  description?: string | null;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceInput {
  title: string;
  description?: string;
  categoryId: string;
  price: number;
}
