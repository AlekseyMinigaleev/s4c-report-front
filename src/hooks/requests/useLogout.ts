import { AuthenticationTokens } from "../../models/AuthenticationTokens";
import useAuthorizedApi from "../useAuthorizedApi";


export default function useLogout() {
  const api = useAuthorizedApi();
  async function logout() {
    const response = await api.get<AuthenticationTokens>(
      "authentication/logout",
    );
    return response;
  }

  return logout;
}