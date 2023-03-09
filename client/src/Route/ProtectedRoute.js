import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ isAuth }) {
  console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/adminlogin" />;
}
