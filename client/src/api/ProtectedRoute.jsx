// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectCurrentUserRole } from "../redux/authSlice";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  // const userRole = useSelector(selectCurrentUserRole);
    const userRole = 'teacher';
    


  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/" />;
};


export default ProtectedRoute;