import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { AuthenticationTokens } from "../models/AuthenticationTokens";

interface AuthContextProps {
  auth?: AuthenticationTokens;
  setAuth: Dispatch<SetStateAction<AuthenticationTokens | undefined>>;
}

const AuthContext = createContext<AuthContextProps>({
  auth: {
    accessToken: "",
    refreshToken: "",
  },
  setAuth: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthenticationTokens>();
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
