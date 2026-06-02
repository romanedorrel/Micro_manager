import { supabase } from "../lib/supabaseServer";

export type GoalInput = {
  title: string;
  description?: string;
  deadline?: string;
  priority?: string;
  effort?: string;
  available_days?: string[];
  notes?: string;
  status?: string;
};

export type GoalUpdate = Partial<GoalInput>;

export const getGoals = async (userID: string) => {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", userID);

  if (error) {
    throw error;
  }
  return data;
};

export const getGoal = async (id: string, userId: string) => {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", userId)
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const createGoal = async (goalData: GoalInput, userId: string) => {
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
) => {
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

export const deleteGoal = async (id: string, userId: string) => {
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
