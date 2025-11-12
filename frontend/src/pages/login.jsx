import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { login as apiLogin } from "../api/auth.js";

export default function Login() {
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [msg, setMsg] = React.useState("");
  const { login } = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      const data = await apiLogin(form);
      login({ token: data.token, user: data.user });
      setMsg("Logged in!");
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })}/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({ ...form, password: e.target.value })}/>
      <button type="submit">Login</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
