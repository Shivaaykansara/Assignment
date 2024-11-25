import express from "express";
import { createNote, getNotes, deleteNote } from "../controllers/noteController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Route to create a new note
router.post("/create", authMiddleware, createNote);

// Route to get all notes
router.get("/", authMiddleware, getNotes);

// Route to delete a note
router.delete("/:noteId", authMiddleware, deleteNote);

export default router;
