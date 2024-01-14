import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { User } from "../models/User";

interface Authentication {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextProps {
  auth?: Authentication;
  setAuth: Dispatch<SetStateAction<Authentication | undefined>>;
}

const AuthContext = createContext<AuthContextProps>({
  auth: {
    accessToken: "",
    refreshToken: "",
  },
  setAuth: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Authentication>();
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
