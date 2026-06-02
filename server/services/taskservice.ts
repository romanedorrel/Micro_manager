import { supabase } from "../lib/supabaseServer";
export type TaskInput = {
  goal_id: string;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string;
};

export type TaskUpdate = Partial<Omit<TaskInput, "goal_id">>;

export const getTasks = async (userId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
  return data;
};

export const getTask = async (id: string, userId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};
export const getTasksByGoal = async (goalId: string, userId: string) => {
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

export const createTask = async (taskData: TaskInput, userId: string) => {
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
) => {
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

export const deleteTask = async (id: string, userId: string) => {
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
