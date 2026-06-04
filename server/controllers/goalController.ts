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
    return res.status(500).json({ message: error });
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
    return res.status(500).json({ message: error });
  }
};

export const createGoal = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const goal = await goalService.createGoal(
      req.body,
      userId,
      req.accessToken,
    );
    res.status(201).json(goal);
  } catch (error) {
    return res.status(400).json({ message: error });
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
    res.status(200).json({ goal });
  } catch (e) {
    return res.status(500).json({ message: e });
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
    return res.status(500).json({ message: e });
  }
};
