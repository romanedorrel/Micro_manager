export type TaskInput = {
  goal_id: string;
  title: string;
  description?: string;
  estimated_duration?: string;
  status?: "pending" | "completed";
  order_position?: number;
  scheduled_date?: string | null;
};

export type Task = TaskInput & {
  id: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
};

export type TaskUpdate = Partial<Omit<TaskInput, "goal_id">>;
