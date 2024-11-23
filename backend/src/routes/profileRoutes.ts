import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getUserProfile } from "../controllers/profileController";

const router = express.Router();

// Secure route using authMiddleware
router.get("/profile", authMiddleware, getUserProfile);

export default router;