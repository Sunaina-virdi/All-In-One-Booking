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
    return <h1>Not an Admin</h1>;
    // Alternatively, redirect to another route:
    // return <Navigate to="/" />;
  }

  // If the user is an admin, render the children (AdminDashboard in this case)
  return children;
};

export default ProtectedRoute;
