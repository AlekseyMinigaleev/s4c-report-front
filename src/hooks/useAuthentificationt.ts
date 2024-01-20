import React, { useContext } from "react";
import AuthentificationContext from "../context/AuthProvider";

export default function useAuthentification() {
  return useContext(AuthentificationContext);
}
