import { supabase } from "../supabase";
import { Verification } from "../types";

export const getHousingTips = async (id: string) => {
  const { data, error } = await supabase
    .from("housing_tips")
    .select(`*,   user_profiles:user_id(name, avatar_url)`)
    .eq("neighborhood_id", id);

  if (error) {
    console.error("Error fetching housing tips:", error);
    return [];
  }
  console.log(data);
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
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching housing tips:", error);
    return [];
  }

  // Count verifications
  const processedData = data?.map((tip) => ({
    ...tip,
    verification_count:
      tip.verifications?.filter((v: Verification) => v.verified).length || 0,
    is_verified:
      (tip.verifications?.filter((v: Verification) => v.verified).length || 0) >
      0,
  }));

  return processedData || [];
};
