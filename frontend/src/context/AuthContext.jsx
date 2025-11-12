import React from "react";

const AuthCtx = React.createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  function login({ token, user }) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthCtx.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
