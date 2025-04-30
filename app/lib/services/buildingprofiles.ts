import { supabase } from "@/app/lib/supabase";

export const getBuildingProfile = async (buildingId: string) => {
  const { data, error } = await supabase
    .from("building_profiles")
    .select(
      `
      *,
      neighborhood:neighborhood_id(name, housing_tips(*)),
      housing_tips(*)
    `
    )
    .eq("id", buildingId)
    .single();

  if (error) {
    console.error("Error fetching building:", error);
    return null;
  }

  return data;
};

export const searchBuildings = async (
  query: string,
  neighborhoodId?: string
) => {
  let queryBuilder = supabase
    .from("building_profiles")
    .select(`id, name,  image_url, neighborhood_id`)
    .ilike("name", `%${query}%`);

  if (neighborhoodId) {
    queryBuilder = queryBuilder.eq("neighborhood_id", neighborhoodId);
  }

  const { data, error } = await queryBuilder.limit(10);

  if (error) {
    console.error("Error searching buildings:", error);
    return [];
  }

  return data;
};

export const getBuildingsByNeighborhood = async (neighborhoodId: string) => {
  const { data, error } = await supabase
    .from("building_profiles")
    .select(
      `
      *,
      neighborhoods:neighborhood_id(name)
    `
    )
    .eq("neighborhood_id", neighborhoodId)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Error fetching buildings:", error);
    return [];
  }

  return data;
};

export const getAllBuildingProfiles = async (): Promise<
  { id: string; name: string }[]
> => {
  const { data, error } = await supabase
    .from("building_profiles")
    .select("id, name");

  if (error) {
    console.error("Error fetching building_profiles:", error);
    return [];
  }

  return data;
};
