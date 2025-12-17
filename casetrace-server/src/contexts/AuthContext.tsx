import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser as apiLogin } from "../api/api";
import { useNavigate } from "react-router-dom";

type User = { id: number; email: string; role?: string } | null;

type AuthContextType = {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("ct_token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Optionally decode token or fetch user profile.
      // For simplicity we store minimal info in localStorage.
      const u = localStorage.getItem("ct_user");
      if (u) setUser(JSON.parse(u));
    }
  }, [token]);

  async function login(email: string, password: string) {
    try {
      const res = await apiLogin(email, password);
      if (res?.token) {
        setToken(res.token);
        localStorage.setItem("ct_token", res.token);
        if (res.user) {
          setUser(res.user);
          localStorage.setItem("ct_user", JSON.stringify(res.user));
        }
        return true;
      }
      return false;
    } catch (e) {
      console.error("Login failed", e);
      return false;
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("ct_token");
    localStorage.removeItem("ct_user");
    navigate("/", { replace: true });
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
