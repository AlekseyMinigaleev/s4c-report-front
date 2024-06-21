import { useContext } from "react";
import AuthentificationContext from "../context/AuthProvider";

export default function useAuthContext() {
  return useContext(AuthentificationContext);
}
