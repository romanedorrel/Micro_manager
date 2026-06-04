import { createAuthedSupabaseClient } from "../lib/supabaseServer";
import type { TaskInput, TaskUpdate } from "../types/taskTypes";

export const getTasks = async (userId: string, accessToken: string) => {
  const supabase = createAuthedSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
  return data;
};

export const getTask = async (id: string, userId: string, accessToken: string) => {
  const supabase = createAuthedSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data;
};
export const getTasksByGoal = async (
  goalId: string,
  userId: string,
  accessToken: string,
) => {
  const supabase = createAuthedSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .eq("goal_id", goalId);

  if (error) {
    throw error;
  }
  return data;
};

export const createTask = async (
  taskData: TaskInput,
  userId: string,
  accessToken: string,
) => {
  const supabase = createAuthedSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ ...taskData, user_id: userId }])
    .select()
    .single();
  if (error) {
    throw error;
  }
  return data;
};
export const updateTask = async (
  id: string,
  updates: TaskUpdate,
  userId: string,
  accessToken: string,
) => {
  const supabase = createAuthedSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("user_id", userId)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const deleteTask = async (
  id: string,
  userId: string,
  accessToken: string,
) => {
  const supabase = createAuthedSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("user_id", userId)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};
