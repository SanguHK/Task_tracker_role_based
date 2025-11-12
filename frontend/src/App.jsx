import "./styles.css";
import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function Router() {
  const [route, setRoute] = React.useState("login");
  const { token } = useAuth();

  React.useEffect(() => {
    if (token) setRoute("dashboard");
  }, [token]);

  return (
    <div style={{ maxWidth: 720, margin: "24px auto", fontFamily: "sans-serif" }}>
      <h2>Scalable API Demo</h2>
      <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setRoute("login")}>Login</button>
        <button onClick={() => setRoute("register")}>Register</button>
        <button onClick={() => setRoute("dashboard")}>Dashboard</button>
      </nav>

      {route === "login" && <Login />}
      {route === "register" && <Register />}
      {route === "dashboard" && <Dashboard />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App; // ✅ VERY IMPORTANT
