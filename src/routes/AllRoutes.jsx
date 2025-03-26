import React from "react";

import { Route, Routes } from "react-router";

import { Dashboard, ErrorPage, Users, Artist, Music } from "../pages";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<Users />} />
        <Route path="/artist">
          <Route index element={<Artist />} />
          <Route path="music" element={<Music />} />
        </Route>
      </Routes>
    </>
  );
};
