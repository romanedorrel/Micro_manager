import { supabase } from "../lib/supabaseServer";

export const getGoals = async () => {
  const { data, error } = await supabase.from("goals").select("*");

  if (error) {
    throw error;
  }
  return data;
};

export const getGoal = async (id: string) => {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const createGoal = async (goalData: any) => {
  const { data, error } = await supabase
    .from("goals")
    .insert([goalData])
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const updateGoal = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("goals")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const deleteGoal = async (id: string) => {
  const { data, error } = await supabase
    .from("goals")
    .delete()
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data;
};
