import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import goalRoutes from "./routes/goalRoutes";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import aiRoutes from "./routes/aiRoutes";
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();
const PORT = 3000;
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://truenorth-seven.vercel.app",
];

app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/goals", authMiddleware, goalRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);
app.use("/api/ai", aiRoutes);
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
