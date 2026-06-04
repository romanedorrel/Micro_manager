import { createAuthedSupabaseClient } from "../lib/supabaseServer";
import type { GoalInput, GoalUpdate } from "../types/goalTypes";

export const getGoals = async (userID: string, accessToken: string) => {
  const supabase = createAuthedSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", userID);

  if (error) {
    throw error;
  }
  return data;
};

export const getGoal = async (id: string, userId: string, accessToken: string) => {
  const supabase = createAuthedSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", userId)
    .eq("id", id)
    .maybeSingle();
  if (error) {
    throw error;
  }
  return data;
};

export const createGoal = async (
  goalData: GoalInput,
  userId: string,
  accessToken: string,
) => {
  const supabase = createAuthedSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from("goals")
    .insert([{ ...goalData, user_id: userId }])
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const updateGoal = async (
  id: string,
  updates: GoalUpdate,
  userId: string,
  accessToken: string,
) => {
  const supabase = createAuthedSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from("goals")
    .update(updates)
    .eq("user_id", userId)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const deleteGoal = async (
  id: string,
  userId: string,
  accessToken: string,
) => {
  const supabase = createAuthedSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from("goals")
    .delete()
    .eq("user_id", userId)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data;
};
