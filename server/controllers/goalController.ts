import * as goalService from "../services/goalService";
import { Request, Response } from "express";

export const getGoals = async (req: Request, res: Response) => {
  try {
    const goals = await goalService.getGoals();
    res.status(200).json(goals);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const goal = await goalService.getGoal(id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json(goal);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createGoal = async (req: Request, res: Response) => {
  try {
    const goal = await goalService.createGoal(req.body);
    res.status(201).json(goal);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const updateGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const goal = await goalService.updateGoal(id, req.body);
    if (!goal) {
      return res.status(404).json({ message: "No Goal Found" });
    }
    res.status(200).json({ goal });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export const deleteGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedGoal = await goalService.deleteGoal(id);
    if (!deletedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
