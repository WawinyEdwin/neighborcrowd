import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    profile?: UserProfile;
  }

  interface Session {
    user?: User;
  }
}

export interface IdAndName {
  id: string;
  name: string;
}

export interface Verification {
  id: string;
  user_profiles: UserProfile;
  verified: boolean;
  comment: string;
}
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  role: "resident" | "hunter" | "scout";
  neighborhood_id?: string;
  verified: boolean;
  points: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  location: {
    latitude: number;
    longitude: number;
  };
  average_rent: string;
  commute_time: string;
  safety_rating: number;
  amenities: string[];
  tip_count: number;
  verified_residents: number;
}

export interface NeighborhoodSummary {
  id: string;
  name: string;
  image_url: string;
  tip_count: number;
  average_rent: string;
}

export interface HousingTip {
  id: string;
  user_id: string;
  neighborhood_id: string;
  building_name: string;
  description: string;
  contact_info: string;
  availability: boolean;
  images: string[];
  created_at: string;
  verified: boolean;
  verification_count: number;
}

export interface HousingTipWithUserProfile {
  id: string;
  user_id: string;
  neighborhood_id: string;
  building_name: string;
  description: string;
  contact_info: string;
  availability: boolean;
  images: string[];
  created_at: string;
  verified: boolean;
  verification_count: number;
  user_profiles: {
    name: string;
    avatar_url: string;
  };
}

export interface BuildingProfile {
  id: string;
  name: string;
  neighborhood_id: string;
  image_url?: string;
  description: string;
  amenities: string[];
  landlord_rating: number;
  overall_rating: number;
  tips: HousingTip[];
}

export interface BuildingProfileInfo {
  id: string;
  name: string;
  neighborhood: Neighborhood;
  image_url?: string;
  description: string;
  amenities: string[];
  landlord_rating: number;
  overall_rating: number;
  tips: HousingTip[];
  review_count?: number;
  unit_count?: number;
  water_availability?: number;
}

export interface BuildingProfileSearch {
  id: string;
  name: string;
  neighborhood_id: string;
  image_url: string;
}
