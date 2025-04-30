import { supabase } from "@/app/lib/supabase";
import { Neighborhood, NeighborhoodSummary } from "../types";

export const getNeighborHoods = async (
  limit: number
): Promise<NeighborhoodSummary[]> => {
  const { data, error } = await supabase
    .from("neighborhoods")
    .select(`id, name, image_url, tip_count, average_rent`)
    .order("tip_count", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching neighborhoods:", error);
    return [];
  }

  return data;
};

export const getAllNeighborHoods = async (): Promise<
  { id: string; name: string }[]
> => {
  const { data, error } = await supabase
    .from("neighborhoods")
    .select("id, name");

  if (error) {
    console.error("Error fetching neighborhoods:", error);
    return [];
  }

  return data;
};

export const getNeighborhoodById = async (
  id: string
): Promise<Neighborhood | null> => {
  const { data, error } = await supabase
    .from("neighborhoods")
    .select(`*`)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching neighborhood:", error);
    return null;
  }

  return data;
};

export const getTopContributors = async (neighborhoodId: string) => {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("id, name, avatar_url, points")
    .eq("neighborhood_id", neighborhoodId)
    .order("points", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching contributors:", error);
    return [];
  }

  return data;
};
