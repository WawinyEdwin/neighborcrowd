import { supabase } from "@/app/lib/supabase";
import { UserProfile } from "../types";

export const createUserProfile = async ({
  email,
  name,
  avatar_url,
}: {
  email: string;
  name: string;
  avatar_url: string;
}) => {
  const { error } = await supabase.from("user_profiles").insert({
    email,
    name,
    avatar_url,
    role: "hunter",
    verified: false,
    points: 0,
  });

  return { error: error}
};

export const getUserProfileByEmail = async (
  user_email: string | undefined | null
): Promise<UserProfile | null> => {
  const { data: existingUser, error: userError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", user_email)
    .single();

  if (userError) {
    console.error("Error fetching profile by email:", userError);
    return null;
  }

  return existingUser;
};
