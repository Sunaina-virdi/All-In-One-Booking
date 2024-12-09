import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext"; // Adjust path as necessary

const ProtectedRoute = ({ children }) => {
  const { user, ready } = useContext(UserContext);

  // Ensure the app doesn't render the route before user data is loaded
  if (!ready) {
    return <div>Loading...</div>;
  }

  // Check if the user is an admin
  if (user?.role !== "admin") {
    return <div className="max-w-md mt-5 mx-auto p-6 bg-gradient-to-br from-blue-100 to-blue-300 shadow-xl rounded-lg">
      <h1 className="text-xl font-semibold text-center">Oops!!!</h1>
      <h1 className="text-xl font-semibold text-center">Not an Admin</h1>
    </div>;
    // Alternatively, redirect to another route:
    // return <Navigate to="/" />;
  }

  // If the user is an admin, render the children (AdminDashboard in this case)
  return children;
};

export default ProtectedRoute;
