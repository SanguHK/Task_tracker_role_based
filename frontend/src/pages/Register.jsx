import React from "react";
import { register as apiRegister } from "../api/auth.js";

export default function Register() {
  const [form, setForm] = React.useState({ name: "", email: "", password: "", role: "user" });
  const [msg, setMsg] = React.useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      await apiRegister(form);
      setMsg("Registered! You can login now.");
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
      <input placeholder="Name" value={form.name} onChange={e=>setForm({ ...form, name: e.target.value })}/>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })}/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({ ...form, password: e.target.value })}/>
      <select value={form.role} onChange={e=>setForm({ ...form, role: e.target.value })}>
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
      <button type="submit">Register</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
