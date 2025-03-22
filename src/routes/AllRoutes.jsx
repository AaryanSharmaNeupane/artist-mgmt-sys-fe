import React from "react";

import { Route, Routes } from "react-router";

import { Dashboard, ErrorPage, Users, Artist } from "../pages";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<Users />} />
        <Route path="/artist" element={<Artist />} />
      </Routes>
    </>
  );
};
