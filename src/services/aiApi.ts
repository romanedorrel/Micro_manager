// services/aiApi.ts
const API_URL = import.meta.env.VITE_API_URL;

export const generateTasks = async (
  goal: {
    id: string;
    title: string;
    description?: string;
    deadline?: string;
    priority?: string;
    effort?: string;
  },
  accessToken: string,
) => {
  const response = await fetch(`${API_URL}/ai/generate-tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      goalId: goal.id,
      title: goal.title,
      description: goal.description,
      deadline: goal.deadline,
      priority: goal.priority,
      effort: goal.effort,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate tasks");
  }

  return response.json();
};
