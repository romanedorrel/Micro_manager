import { generateTasks } from "../controllers/aiController";
import { Router } from "express";

const aiRouter = Router();

aiRouter.post("/generate-tasks", generateTasks);

export default aiRouter;
