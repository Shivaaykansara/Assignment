// NoteContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "./authApi";
import { NoteContextType, Note } from "./type";

const NoteContext = createContext<NoteContextType | undefined>(undefined);

interface NoteProviderProps {
  token: string | null;
  children: ReactNode;
}

export const NoteProvider: React.FC<NoteProviderProps> = ({ token, children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  const createNote = async (title: string) => {
    try {
      const response = await axios.post(
        "/api/notes/create",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prevNotes) => [...prevNotes, response.data.note]);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create note");
    }
  };

  const getNotes = async () => {
    try {
      const response = await axios.get("/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data.notes);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch notes");
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      await axios.delete(`/api/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to delete note");
    }
  };

  return (
    <NoteContext.Provider value={{ createNote, getNotes, deleteNote,  setNotes,notes, error}}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = (): NoteContextType => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNote must be used within a NoteProvider");
  }
  return context;
};
