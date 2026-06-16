import * as goalService from "../services/goalService";
import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import { IdParams } from "../types/requestTypes";

export const getGoals = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const goals = await goalService.getGoals(userId, req.accessToken);
    res.status(200).json(goals);
  } catch (error) {
    console.error("Failed to get goals", error);
    return res
      .status(500)
      .json({ message: "Failed to get goals. Please try again" });
  }
};

export const getGoal = async (req: AuthRequest<IdParams>, res: Response) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Goal ID is required" });
    }
    const goal = await goalService.getGoal(id, userId, req.accessToken);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json(goal);
  } catch (error) {
    console.error("Failed to get goal", error);
    return res
      .status(500)
      .json({ message: "Failed to get goal. Please try again" });
  }
};

export const createGoal = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { title, deadline } = req.body;
    if (!title || !deadline) {
      return res
        .status(400)
        .json({ message: "Title and deadline is required to create a goal" });
    }
    const goal = await goalService.createGoal(
      req.body,
      userId,
      req.accessToken,
    );
    res.status(201).json(goal);
  } catch (error) {
    console.error("Failed to create goal", error);
    return res
      .status(500)
      .json({ message: "Unable to create the goal. Please try again" });
  }
};

export const updateGoal = async (req: AuthRequest<IdParams>, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const goal = await goalService.updateGoal(
      id,
      req.body,
      userId,
      req.accessToken,
    );
    if (!goal) {
      return res.status(404).json({ message: "No Goal Found" });
    }
    res.status(200).json(goal);
  } catch (e) {
    console.error("Failed to update goal", e);
    return res
      .status(500)
      .json({ message: "Failed to update goal. Please try again" });
  }
};

export const deleteGoal = async (req: AuthRequest<IdParams>, res: Response) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const deletedGoal = await goalService.deleteGoal(
      id,
      userId,
      req.accessToken,
    );
    if (!deletedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (e) {
    console.error("Failed to delete goal", e);
    return res
      .status(500)
      .json({ message: "Failed to delete goal. Please try again" });
  }
};
