import { Route, Routes, Navigate } from "react-router-dom";
import GamesPage from "./pages/GamesPage/GamesPage";
import UserPage from "./pages/userPage/UserPage";
import AuthPage from "./pages/authPages/authPage/AuthPage";
import RequireAuthLayout from "./components/RequireAuthLayout";
import AppLayout from "./components/AppLayout";
import PersistLogin from "./components/PersistLogin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* public */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/*" element={<Navigate to="/auth" replace />} />

        {/* private */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuthLayout />}>
            <Route path="/welcome" element={<GamesPage />} />
            <Route path="/user" element={<UserPage />} />
          </Route>
        </Route>

        {/* catch all */}
      </Route>
    </Routes>
  );
}
