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
  
  isPersist: boolean;
  setIsPersist: Dispatch<SetStateAction<boolean>>;
}

const AuthentificationContext = createContext<AuthentificationContextProps>({
  auth: {
    accessToken: "",
  },
  setAuth: () => {},
  isPersist: false,
  setIsPersist: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthenticationTokens>();

  const persistValue = localStorage.getItem("persist");
  const [isPersist, setIsPersist] = useState<boolean>(
    persistValue ? persistValue == "true" : false
  );

  return (
    <AuthentificationContext.Provider
      value={{
        auth,
        setAuth,
        isPersist,
        setIsPersist,
      }}
    >
      {children}
    </AuthentificationContext.Provider>
  );
}

export default AuthentificationContext;
