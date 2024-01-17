import useAuthentification from "./userAuthentificationt";
import api from "../api/axios";
import { AuthenticationTokens } from "../models/AuthenticationTokens";

export default function useRefreshToken() {
  const authContext = useAuthentification();

  async function refresh() {
    const response = await api.get<AuthenticationTokens>(
      "Authentication/refresh",
      {
        withCredentials: true,
      }
    );
    authContext.setAuth({
      accessToken: response.data.accessToken,
    });
    return response.data.accessToken;
  }

  return refresh;
}
