import { createAuthedSupabaseClient } from "../lib/supabaseServer";

export const getProfile = async (userId: string, accessToken: string) => {
  const supabase = createAuthedSupabaseClient(accessToken);

  const { data: existingProfile, error: getError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (getError) throw getError;

  if (existingProfile) {
    return existingProfile;
  }

  const { data: newProfile, error: createError } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      onboarding_completed: false,
    })
    .select("*")
    .single();

  if (createError) throw createError;

  return newProfile;
};

export const completeOnboarding = async (
  userId: string,
  accessToken: string,
) => {
  const supabase = createAuthedSupabaseClient(accessToken);

  const { data, error } = await supabase
    .from("profiles")
    .update({ onboarding_completed: true })
    .eq("id", userId)
    .select("*")
    .maybeSingle();

  if (error) throw error;

  return data;
};
