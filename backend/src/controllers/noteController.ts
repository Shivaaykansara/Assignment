import { Request, Response } from "express";
import Note from "../models/noteModel";

interface AuthenticatedRequest extends Request {
  user?: { id: string }; // User object populated by authMiddleware
}

// Create a new note
export const createNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { title} = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    if (!title ) {
      res.status(400).json({ message: "Note is required" });
      return;
    }

    const note = await Note.create({
      user: userId,
      title,
      
    });

    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Could not create note. Please try again later." });
  }
};

// Get all notes for the authenticated user
export const getNotes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    const notes = await Note.find({ user: userId });

    res.status(200).json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Could not fetch notes. Please try again later." });
  }
};

// Delete a note by ID
export const deleteNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { noteId } = req.params;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

    if (!note) {
      res.status(404).json({ message: "Note not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Could not delete note. Please try again later." });
  }
};
