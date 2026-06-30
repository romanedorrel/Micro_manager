import { Router } from "express";
import {
  getProfile,
  completeOnboarding,
} from "../controllers/profileController";

const profileRoutes = Router();

profileRoutes.get("/me", getProfile);
profileRoutes.patch("/onboarding", completeOnboarding);

export default profileRoutes;
