import { useState, useEffect, ReactNode } from "react";
import { AuthContext, AuthUser } from "./AuthContextObject";
import { DEMO_USER } from "../data/account";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  const login = (u: AuthUser) => setUser(u);
  const loginDemo = () => setUser(DEMO_USER);
  const logout = () => setUser(null);
  const updateUser = (data: Partial<AuthUser>) =>
    setUser((prev) => (prev ? { ...prev, ...data } : null));

  return (
    <AuthContext.Provider
      value={{ user, login, loginDemo, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
