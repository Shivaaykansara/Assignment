// types.ts

export interface User {
  name: string;
  email: string;
  dob: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  token: string | null;
  user: User | null;
  error: string | null;
  otpSent: boolean;
  sendOtp: (email: string, action: string, name?: string, dob?: string) => void;
  verifyOtp: (email: string, otp: string) => void;
  fetchUserData: (token: string) => void;
  logout: () => void;
}

export interface Note {
  _id: string;
  title: string;

}

export interface NoteContextType {
  createNote: (title: string) => void;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  getNotes: () => void;
  
  deleteNote: (noteId: string) => void;
  notes: Note[];
  error: string | null;
}
