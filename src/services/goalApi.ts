import type { GoalInput, GoalUpdate } from "../types/goalTypes";
const API_URL = import.meta.env.VITE_API_URL + "/goals";

export const getGoals = async (token: string) => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error fetching goals");
  }
  return data;
};

export const getGoalById = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error fetching goal");
  }
  return data;
};

export const createGoal = async (goalData: GoalInput, token: string) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(goalData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error creating goal");
  }
  return data;
};

export const updateGoal = async (
  id: string,
  goalData: GoalUpdate,
  token: string,
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(goalData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update goal");
  }
  return data;
};

export const deleteGoal = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete goal");
  }
  return data;
};
