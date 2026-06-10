import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type GenerateTasksInput = {
  goalId: string;
  title: string;
  description?: string;
  priority?: string;
  effort?: string;
  deadline?: string;
};

type GeneratedTask = {
  title: string;
  description: string;
  status: "pending";
};

const cleanJsonResponse = (text: string) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

export const generateTasks = async (goal: GenerateTasksInput) => {
  console.log("Generating tasks for:", goal.title);
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: ` 
    
Create 5 practical tasks for this goal.

Goal title: ${goal.title}
Description: ${goal.description || ""}
Deadline: ${goal.deadline || ""}
Priority: ${goal.priority || ""}
Effort: ${goal.effort || ""}

Return only raw valid JSON. Do not include markdown, backticks, code fences, or explanation. The JSON should be in this format:
{
  "tasks": [
    {
      "title": "Task title",
      "description": "Task description",
      "status": "pending"
    }
  ]
}
`,
  });
  const text = response.output_text;
  const cleanedText = cleanJsonResponse(text);
  const parsed = JSON.parse(cleanedText) as { tasks: GeneratedTask[] };
  return parsed.tasks.map((task) => ({
    ...task,
    goal_id: goal.goalId,
  }));
};
