import * as aiService from "../services/aiService";
import { Request, Response } from "express";

export const generateTasks = async (req: Request, res: Response) => {
  try {
    const { goalId, title, description, deadline, priority, effort } = req.body;

    if (!goalId || !title) {
      return res.status(400).json({ error: "Goal ID and title are required" });
    }
    const generatedTasks = await aiService.generateTasks({
      goalId,
      title,
      description,
      deadline,
      priority,
      effort,
    });

    res.status(200).json({ tasks: generatedTasks });
  } catch (error) {
    console.error("Error generating tasks:", error);

    res.status(500).json({ error: "Failed to generate tasks" });
  }
};
