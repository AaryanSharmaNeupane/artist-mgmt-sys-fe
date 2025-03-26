import React from "react";

import { Navigate, Route, Routes } from "react-router";

import { Dashboard, ErrorPage, Users, Artist, Music } from "../pages";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
};
export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/user" element={<ProtectedRoute element={<Users />} />} />
        <Route path="/artist">
          <Route index element={<ProtectedRoute element={<Artist />} />} />
          <Route
            path="music"
            element={<ProtectedRoute element={<Music />} />}
          />
        </Route>
      </Routes>
    </>
  );
};
