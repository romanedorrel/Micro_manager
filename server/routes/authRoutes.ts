import { signUpUser, logInUser } from "../controllers/authController";
import { Router } from "express";

const authRoutes = Router();
authRoutes.post("/signUp", signUpUser);
authRoutes.post("/logIn", logInUser);

export default authRoutes;
