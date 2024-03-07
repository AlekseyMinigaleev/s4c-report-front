import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthContext from "../useAuthContext";
import Header from "../../widgets/header/Header";

export default function RequireAuthLayout() {
  const authContext = useAuthContext();
  const location = useLocation();

  return (
    <>
      {authContext.auth?.accessToken ? (
        <>
          <Header />
          <Outlet />
        </>
      ) : (
        <Navigate to={"/auth"} state={{ from: location }} replace />
      )}
    </>
  );
}
