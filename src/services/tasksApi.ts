import type { TaskInput, TaskUpdate } from "../types/taskTypes";
const API_URL = "https://micro-manager.onrender.com/tasks";

export const getTasks = async (token: string) => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error fetching tasks");
  }
  return data;
};

export const getTask = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error fetching tasks");
  }
  return data;
};

export const getTasksByGoalId = async (goalId: string, token: string) => {
  const response = await fetch(`${API_URL}/goal/${goalId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error fetching task");
  }
  return data;
};

export const createTask = async (taskData: TaskInput, token: string) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error creating task");
  }
  return data;
};

export const updateTask = async (
  id: string,
  taskData: TaskUpdate,
  token: string,
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update task");
  }
  return data;
};

export const deleteTask = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete task");
  }
  return data;
};
