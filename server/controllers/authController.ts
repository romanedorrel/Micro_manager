import * as authService from "../services/authService";
import { Request, Response } from "express";

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.signUpUser(email, password);
    res.status(201).json(user);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
    return res.status(500).json({ message: "Failing to signup" });
  }
};

export const logInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.logInUser(email, password);
    res.status(200).json(user);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
    return res.status(500).json({ message: "Invalid login credentials" });
  }
};
