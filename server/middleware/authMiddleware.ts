import { Request, Response, NextFunction } from "express";
import { supabase } from "../lib/supabaseServer";
import { AuthRequest } from "../types/authRequest";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "No authorization header provided" });
    }
    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    (req as AuthRequest).user = user;

    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Authentication failed" });
  }
};
