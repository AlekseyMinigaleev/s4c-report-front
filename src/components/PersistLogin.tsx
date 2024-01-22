import { useEffect, useRef, useState } from "react";
import useRefreshToken from "../hooks/requests/useRefreshToken";
import useAuthContext from "../hooks/useAuthContext";
import { Outlet } from "react-router-dom";

// TODO: я не понимаю почему тут не работает если убрать isLoading
export default function PersistLogin() {
  const authContext = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refresh = useRefreshToken();

  useEffect(() => {
    async function verifyRefreshToken() {
      await refresh();
      setIsLoading(false);
    }

    !authContext.auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <p>Загрузка...</p> : <Outlet />}</>;
}
