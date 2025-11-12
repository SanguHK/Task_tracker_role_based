import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { createTask } from "../api/tasks.js";

export default function TaskForm({ onSuccess }) {
  const { token } = useAuth();
  const [form, setForm] = React.useState({ title: "", description: "", status: "todo" });
  const [msg, setMsg] = React.useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      await createTask(token, form);
      setForm({ title: "", description: "", status: "todo" });
      onSuccess?.();
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
      <input placeholder="Task title" value={form.title} onChange={e=>setForm({ ...form, title: e.target.value })}/>
      <input placeholder="Description" value={form.description} onChange={e=>setForm({ ...form, description: e.target.value })}/>
      <select value={form.status} onChange={e=>setForm({ ...form, status: e.target.value })}>
        <option value="todo">todo</option>
        <option value="in_progress">in_progress</option>
        <option value="done">done</option>
      </select>
      <button type="submit">Add Task</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
