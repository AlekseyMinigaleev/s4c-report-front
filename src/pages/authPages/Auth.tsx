import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Welcome from "./welcome/Welcome";
export default function Auth() {
  return (
    <>
      <Routes>
        <Route path="welcome" element={<Welcome />} />
        <Route path="*" element={<Navigate to="/auth/welcome" replace />} />
      </Routes>
    </>
  );
}
