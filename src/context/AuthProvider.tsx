import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { AuthenticationTokens } from "../models/AuthenticationTokens";

interface AuthentificationContextProps {
  auth?: AuthenticationTokens;
  setAuth: Dispatch<SetStateAction<AuthenticationTokens | undefined>>;
}

const AuthentificationContext = createContext<AuthentificationContextProps>({
  auth: {
    accessToken: "",
  },
  setAuth: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthenticationTokens>();
  return (
    <AuthentificationContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthentificationContext.Provider>
  );
}

export default AuthentificationContext;
