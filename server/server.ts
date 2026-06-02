import "dotenv/config";
import express from "express";
import goalRoutes from "./routes/goalRoutes";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import { authMiddleware } from "./middleware/authMiddleware";
import cors from "cors";
const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/goals", authMiddleware, goalRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
