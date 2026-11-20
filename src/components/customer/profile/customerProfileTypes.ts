export interface CustomerProfileInfo {
  id: string;
  profilePhoto: string | null;
  bio: string | null;
}

export interface CustomerProfileData {
  id: string;
  name: string;
  email: string;
  profile: CustomerProfileInfo | null;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerProfileInput {
  name: string;
  email: string;
  profilePhoto: string | null;
  bio: string | null;
}

export interface CustomerProfileApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface MyProfileResponse {
  profile: CustomerProfileData;
}

export interface UpdatedProfileResponse {
  updatedProfile: CustomerProfileData;
}
