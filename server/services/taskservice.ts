import { supabase } from "../lib/supabaseServer";

export const getTasks = async () => {
  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    throw error;
  }
  return data;
};

export const getTask = async (id: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};
export const getTasksByGoal = async (goalId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("goal_id", goalId);

  if (error) {
    throw error;
  }
  return data;
};

export const createTask = async (taskData: any) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert([taskData])
    .select()
    .single();
  if (error) {
    throw error;
  }
  return data;
};
export const updateTask = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const deleteTask = async (id: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};
