import * as profileService from "../services/profileService";
import { Response } from "express";
import { AuthRequest } from "../types/authRequest";

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await profileService.getProfile(
      req.user.id,
      req.accessToken,
    );

    res.status(200).json(profile);
  } catch (error) {
    console.error("Failed to get profile", error);
    return res
      .status(500)
      .json({ message: "Failed to get profile. Please try again" });
  }
};

export const completeOnboarding = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const profile = await profileService.completeOnboarding(
      userId,
      req.accessToken,
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Failed to complete onboarding", error);
    return res
      .status(500)
      .json({ message: "Failed to complete onboarding. Please try again" });
  }
};
