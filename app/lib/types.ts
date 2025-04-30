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

export interface BuildingProfile {
  id: string;
  name: string;
  neighborhood_id: string;
  description: string;
  amenities: string[];
  landlord_rating: number;
  overall_rating: number;
  tips: HousingTip[];
}

import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    profile?: UserProfile; // Replace 'any' with your profile type if you have one
  }

  interface Session {
    user?: User;
  }
}
