import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByGoal,
} from "../controllers/taskController";
import { Router } from "express";

const taskRoutes = Router();
taskRoutes.get("/", getTasks);
taskRoutes.get("/goal/:goalId", getTasksByGoal);
taskRoutes.get("/:id", getTask);
taskRoutes.post("/", createTask);
taskRoutes.put("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;
