import * as authService from "../services/authService";
import { Request, Response } from "express";

const isProduction = process.env.APP_ENV === "production";

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
    const data = await authService.logInUser(email, password);

    res.cookie("refresh_token", data.session.refresh_token, {
      httpOnly: true,
      secure: isProduction, // Set to true in production with HTTPS
      sameSite: isProduction ? "none" : "lax",
      path: "/api/auth/refresh",
    });
    return res
      .status(200)
      .json({ user: data.user, access_token: data.session.access_token });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
    return res.status(500).json({ message: "Invalid login credentials" });
  }
};
export const refreshSession = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const data = await authService.refreshUserSession(refreshToken);

    if (!data.session) {
      return res.status(401).json({ message: "Unable to refresh session" });
    }

    res.cookie("refresh_token", data.session.refresh_token, {
      httpOnly: true,
      secure: isProduction, // Set to true in production with HTTPS
      sameSite: isProduction ? "none" : "lax",
      path: "/api/auth/refresh",
    });

    return res.status(200).json({
      user: data.user,
      access_token: data.session.access_token,
    });
  } catch {
    return res.status(401).json({ message: "Session refresh failed" });
  }
};

export const logOutUser = async (req: Request, res: Response) => {
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: isProduction, // Set to true in production with HTTPS
    sameSite: isProduction ? "none" : "lax",
    path: "/api/auth/refresh",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
