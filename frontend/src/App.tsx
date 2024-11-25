import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/Signin";


const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: '/signin',
      element: <SignIn />
    }
  ]);
    return (
      <RouterProvider router={router} />
    );

};

export default App;
