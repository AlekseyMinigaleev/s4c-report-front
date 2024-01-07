import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import WelcomPage from "./WelcomePage";
import ResetPasswordPage from "./ResetPasswordPage";

export default function AuthPage() {
  return (
    <>
      <Routes>
        <Route path="welcome" element={<WelcomPage />} />
        <Route path="reset" element={<ResetPasswordPage />} />
        <Route path="*" element={<Navigate to="/auth/welcome" replace />} />
      </Routes>
    </>
  );
}
