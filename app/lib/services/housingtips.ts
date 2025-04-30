import { supabase } from "../supabase";
import { HousingTip } from "../types";

export const getHousingTips = async (id: string): Promise<HousingTip[]> => {
  const { data, error } = await supabase
    .from("housing_tips")
    .select(
      "id, building_name, contact_info, availability, user_id, neighborhood_id, description, images, created_at, verification_count, verified"
    )
    .eq("neighborhood_id", id);

  if (error) {
    console.error("Error fetching housing tips:", error);
    return [];
  }

  return data ?? [];
};

export const getLatestHousingTips = async (limit = 10) => {
  const { data, error } = await supabase
    .from("housing_tips")
    .select(
      `
      *,
      neighborhoods:neighborhood_id(name),
      user_profiles:user_id(name, avatar_url),
      verifications:verifications(
        id,
        verified,
        user_id,
        user_profiles:user_id(name, avatar_url)
      )
    `
    ) // Added closing parenthesis here
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching housing tips:", error);
    return [];
  }

  // Process the data to count verifications
  const processedData = data?.map((tip) => ({
    ...tip,
    verification_count:
      tip.verifications?.filter((v: any) => v.verified).length || 0,
    is_verified:
      (tip.verifications?.filter((v: any) => v.verified).length || 0) > 0,
  }));

  return processedData || [];
};