// NotesList.tsx
import React, { useEffect } from "react";
import { useNote } from "../context/NoteContext";

const NotesList: React.FC = () => {
  const { notes, getNotes, deleteNote } = useNote();

  useEffect(() => {
    // Fetch notes when the component mounts
    getNotes();
  }, [getNotes]);

  // Handle note deletion
  const handleDeleteNote = async (noteId: string) => {
    await deleteNote(noteId);
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto mt-8">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Your Notes</h3>
      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note._id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <div>
                <h4 className="text-md font-semibold text-gray-900">{note.title}</h4>
              </div>
              <button
                onClick={() => handleDeleteNote(note._id)}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No notes found. Create a new note to get started!</p>
        )}
      </div>
    </div>
  );
};

export default NotesList;
