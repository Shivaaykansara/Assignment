// NoteForm.tsx
import React, { useState } from "react";
import { useNote } from "../context/NoteContext";

interface NoteFormProps {
  onClose: () => void; // Callback to hide the form after submission
}

const NoteForm: React.FC<NoteFormProps> = ({ onClose }) => {
  const { createNote } = useNote(); // Access createNote from context
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNote(title); // Call createNote from context
    setTitle(""); // Clear the form
    onClose(); // Hide the form after successful submission
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Create Note</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-4 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
