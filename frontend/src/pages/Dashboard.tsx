// Dashboard.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNote } from "../context/NoteContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import icon from "../assets/images/icon.png";
import NoteForm from "../components/NoteForm";
import NotesList from "../components/NoteList";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { getNotes,setNotes } = useNote();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

   useEffect(() => {
    if (user) {
      getNotes(); // Fetch notes when a user logs in
    }
  }, [user, getNotes]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img src={icon} alt="Logo" className="w-8 h-8 mr-2" />
              <h1 className="md:text-xl text-lg mx-10 md:font-semibold text-gray-900">Dashboard</h1>
            </div>
            <Link to={"/signup"}  className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Sign Up
            </Link>
          </div>
          <div className="bg-white max-w-screen-lg p-6 mx-auto rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900">Welcome, Guest! Sign Up to create notes</h2>
            
          </div>
          
        </div>
  
    
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    setNotes([])
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src={icon} alt="Logo" className="w-8 h-8 mr-2" />
            <h1 className="md:text-xl text-lg mx-10 md:font-semibold text-gray-900">Dashboard</h1>
          </div>
          <Link to={"/signin"} onClick={handleLogout} className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Sign Out
          </Link>
        </div>
        <div className="bg-white max-w-screen-lg p-6 mx-auto rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900">Welcome, {user.name}!</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full md:w-4/6 mx-auto block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Note
          </button>
        )}
      </div>

      {showForm && <NoteForm onClose={() => setShowForm(false)} />}

      <NotesList />
    </div>
  );
};

export default Dashboard;
