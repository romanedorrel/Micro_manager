import * as taskService from "../services/taskService";
import { Request, Response } from "express";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTask(id);
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getTasksByGoal = async (req: Request, res: Response) => {
  try {
    const { goalId } = req.params;
    const task = await taskService.getTasksByGoal(goalId);
    if (!task) {
      return res.status(200).json({ message: "No Task found" });
    }
    res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await taskService.updateTask(id, req.body);
    if (!task) {
      return res.status(404).json({ message: "No Task Found" });
    }
    res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = await taskService.deleteTask(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
