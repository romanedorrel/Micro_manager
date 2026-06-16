import * as taskService from "../services/taskservice";
import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import { IdParams, GoalIdParams } from "../types/requestTypes";

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const tasks = await taskService.getTasks(userId, req.accessToken);
    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getTask = async (req: AuthRequest<IdParams>, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const task = await taskService.getTask(id, userId, req.accessToken);
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getTasksByGoal = async (
  req: AuthRequest<GoalIdParams>,
  res: Response,
) => {
  try {
    const userId = req.user.id;
    const { goalId } = req.params;
    const tasks = await taskService.getTasksByGoal(
      goalId,
      userId,
      req.accessToken,
    );
    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Tasks require a title" });
    }
    const task = await taskService.createTask(
      req.body,
      userId,
      req.accessToken,
    );
    res.status(201).json(task);
  } catch (error) {
    console.error("Failed to create task", error);
    return res.status(500).json({ message: "Failed to fetch tasks." });
  }
};

export const updateTask = async (req: AuthRequest<IdParams>, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const task = await taskService.updateTask(
      id,
      req.body,
      userId,
      req.accessToken,
    );
    if (!task) {
      return res.status(404).json({ message: "No Task Found" });
    }
    res.status(200).json(task);
  } catch (e) {
    console.error("Failed to update task", e);
    return res.status(500).json({ message: "Failed to update task" });
  }
};

export const deleteTask = async (req: AuthRequest<IdParams>, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const deletedTask = await taskService.deleteTask(
      id,
      userId,
      req.accessToken,
    );
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (e) {
    console.error("Failed to delete task", e);
    return res.status(500).json({ message: "Failed to delete task" });
  }
};
