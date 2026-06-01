import {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController";
import { Router } from "express";

const goalRoutes = Router();
goalRoutes.get("/", getGoals);
goalRoutes.get("/:id", getGoal);
goalRoutes.post("/", createGoal);
goalRoutes.put("/:id", updateGoal);
goalRoutes.delete("/:id", deleteGoal);

export default goalRoutes;
