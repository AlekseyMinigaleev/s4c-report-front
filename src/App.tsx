import { Route, Routes, Navigate } from "react-router-dom";
import GamesPage from "./pages/gamesPage/GamesPage";
import UserPage from "./pages/userPage/UserPage";
import AuthPage from "./pages/authPages/AuthPage";
import RequireAuthLayout from "./layouts/RequireAuthLayout";
import AppLayout from "./layouts/AppLayout";
import PersistLoginLayout from "./layouts/PersistLoginLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* public */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/*" element={<Navigate to="/auth" replace />} />

        {/* private */}
        <Route element={<PersistLoginLayout />}>
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
