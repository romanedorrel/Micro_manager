import {
  signUpUser,
  logInUser,
  refreshSession,
  logOutUser,
} from "../controllers/authController";
import { Router } from "express";

const authRoutes = Router();
authRoutes.post("/signUp", signUpUser);
authRoutes.post("/logIn", logInUser);
authRoutes.post("/refresh", refreshSession);
authRoutes.post("/logout", logOutUser);

export default authRoutes;
