import { Request, Response } from "express";
import User from "../models/userModel";

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(400).json({ message: "User ID missing" });
      return;
    }

    const user = await User.findById(req.user.id).select("-otp -otpExpiresAt");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User profile fetched", user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};
