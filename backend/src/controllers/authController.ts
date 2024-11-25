import { Request, Response } from "express";
import User from "../models/userModel";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { sendEmail } from "../utils/email";
import jwt from "jsonwebtoken";

// Controller function for sending OTP
export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  const { email, action, name, dob } = req.body;

  if (!email || !action ) {
    res.status(400).json({ message: "action and email are required" });
    return;
  }
  try {
    let existingUser = await User.findOne({ email });

    // Handle Sign Up
    if (action === "signup") {
      if (existingUser) {
         res
          .status(400)
          .json({ message: "Account already exists. Please log in." });
          return;
      }

      
      if (!name || !dob) {
        res
          .status(400)
          .json({ message: "Name and DOB are required for signup" });
        return;
      }
      // Create new user for sign-up process
      existingUser = new User({ name, dob,email, otp: null, otpExpiresAt: null });
      await existingUser.save()
    }

    // Handle Login
    if (action === "login") {
      if (!existingUser) {
         res
          .status(404)
          .json({ message: "Account not found. Please sign up first." });
          return
      }
    }

    // Generate a random OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save the OTP and its expiry in the database
    existingUser = await User.findOneAndUpdate(
      { email },
      { dob,name,otp, otpExpiresAt: Date.now() + 10 * 60 * 1000 }, // OTP valid for 10 minutes
      { new: true, upsert: true }
    );

    // Send OTP via email
    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in sendOTP:", error);
    res
      .status(500)
      .json({ message: "Could not send OTP. Please try again later." });
  }
};
// Controller function for verifying OTP
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;
  
      if (!email || !otp) {
        res.status(400).json({ message: "Email and OTP are required" });
        return;
      }
  
      const user = await User.findOne({ email });
  
      if (!user || user.otp !== otp || new Date() > user.otpExpiresAt!) {
        res.status(400).json({ message: "Invalid or expired OTP" });
        return;
      }
  
  
      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });
  
      // Clear OTP fields
      user.otp = undefined;
      user.otpExpiresAt = undefined;
      await user.save();
  
      res.status(200).json({ message: "OTP verified successfully", token });
    } catch (error) {
      console.error("Error in verifyOTP:", error);
      res.status(500).json({ message: "Could not verify OTP. Please try again later." });
    }
  };
  
