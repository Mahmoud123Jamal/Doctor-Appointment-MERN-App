import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { AuthContextType, DecodedUser } from "../types/authTypes";

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<DecodedUser | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      const decode = jwtDecode<DecodedUser>(storedUser);
      setUser(decode);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decode = jwtDecode<DecodedUser>(token);
    setUser(decode);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
