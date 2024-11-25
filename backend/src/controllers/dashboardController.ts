import { Request, Response } from "express";
import User from "../models/userModel";

interface AuthenticatedRequest extends Request {
    user?: { id: string };
  }

// Fetch user details for the dashboard
export const getDashboard = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // `req.user` is populated by `authenticateUser` middleware
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    const user = await User.findById(userId).select("-otp -otpExpiresAt");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      dob: user.dob,
    });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    res.status(500).json({ message: "Could not fetch dashboard. Please try again later." });
  }
};
