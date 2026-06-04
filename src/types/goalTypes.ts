export type GoalInput = {
  title: string;
  description?: string;
  deadline?: string;
  priority?: "low" | "medium" | "high";
  effort?: "low" | "medium" | "high";
  available_days?: string[];
  notes?: string;
  status?: "current" | "completed";
};
export type Goal = GoalInput & {
  id: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
};

export type GoalUpdate = Partial<GoalInput>;
