import { supabase } from "@/app/lib/supabase";

export const verifyTip = async (
  tipId: string,
  userId: string,
  verified: boolean,
  comment?: string
) => {
  const { data, error } = await supabase
    .from("verifications")
    .upsert(
      {
        tip_id: tipId,
        user_id: userId,
        verified,
        comment,
      },
      { onConflict: "tip_id,user_id" }
    )
    .select();

  if (!error && verified) {
    // Update verification count on the housing tip
    await supabase
      .from("housing_tips")
      .update({
        verification_count: supabase.rpc("increment", {
          table_name: "housing_tips",
          column_name: "verification_count",
          id: tipId,
        }),
      })
      .eq("id", tipId);
  }

  return { data, error };
};

export const getVerificationsForTip = async (tipId: string) => {
  const { data, error } = await supabase
    .from("verifications")
    .select("*, user_profiles:user_id(name, avatar_url)")
    .eq("tip_id", tipId);

  return { verifications: data, error };
};

export const getVerificationStatus = async (tipId: string) => {
  const { data, error } = await supabase
    .from("verifications")
    .select("user_id, verified")
    .eq("tip_id", tipId);

  if (error) return { isVerified: false, verifications: [] };

  const positiveVerifications = data.filter((v) => v.verified).length;
  return {
    isVerified: positiveVerifications > 0,
    verificationCount: positiveVerifications,
    verifications: data,
  };
};
