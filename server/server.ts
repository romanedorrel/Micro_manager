import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import goalRoutes from "./routes/goalRoutes";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(
  cors({ origin: "https://truenorth-seven.vercel.app", credentials: true }),
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/goals", authMiddleware, goalRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
