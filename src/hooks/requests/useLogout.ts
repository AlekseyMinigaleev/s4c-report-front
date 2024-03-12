import { authenticationTokens } from "../../models/authenticationTokens";
import useAuthorizedApi from "../useAuthorizedApi";

export default function useLogout() {
  const api = useAuthorizedApi();
  async function logout() {
    const response = await api.get<authenticationTokens>(
      "authentication/logout"
    );
    return response;
  }

  return logout;
}
