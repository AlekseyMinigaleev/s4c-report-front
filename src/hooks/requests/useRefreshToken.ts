import api from "../../api/anonymousApi";
import { useContext } from "react";
import AuthentificationContext from "../../context/AuthProvider";
import { AuthenticationTokens } from "../../models/AuthenticationTokens";

export default function useRefreshToken() {
  const authContext = useContext(AuthentificationContext);

  async function refresh() {
    const response = await api.get<AuthenticationTokens>(
      "Authentication/refresh",
      {
        withCredentials: true,
      }
    );

    authContext.setAuth(response.data);

    return response.data;
  }

  return refresh;
}
