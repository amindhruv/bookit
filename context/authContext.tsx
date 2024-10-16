"use client";

import checkAuth from "@/app/actions/checkAuth";
import { IAuthContext, User } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const checkAuthentication = async () => {
      const { isAuthenticated, user } = await checkAuth();
      setIsAuthenticated(isAuthenticated);
      setCurrentUser(user);
    };
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
