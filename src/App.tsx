import { Route, Routes, Navigate } from "react-router-dom";
import GamesPage from "./pages/gamesPage/GamesPage";
import UserPage from "./pages/userPage/UserPage";
import AuthPage from "./pages/authPages/AuthPage";
import RequireAuthLayout from "./hooks/layouts/RequireAuthLayout";
import AppLayout from "./hooks/layouts/AppLayout";
import PersistLoginLayout from "./hooks/layouts/PersistLoginLayout";
import GameStatistics from "pages/gameStatisticPage/GameStatistics";
import { routeType } from "models/routeType";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path={`/${routeType[routeType.auth]}`} element={<AuthPage />} />
        <Route
          path={`/${routeType[routeType.auth]}/*`}
          element={<Navigate to={`/${routeType[routeType.auth]}`} replace />}
        />

        <Route element={<PersistLoginLayout />}>
          <Route element={<RequireAuthLayout />}>
            <Route
              path={`/${routeType[routeType.games]}`}
              element={
                <Navigate to={`/${routeType[routeType.games]}/1`} replace />
              }
            />
            <Route
              path={`/${routeType[routeType.games]}/:pageNumber`}
              element={<GamesPage />}
            />
            <Route
              path={`/${routeType[routeType.game]}/:gameId`}
              element={<GameStatistics />}
            />
            <Route
              path={`/${routeType[routeType.user]}`}
              element={<UserPage />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
