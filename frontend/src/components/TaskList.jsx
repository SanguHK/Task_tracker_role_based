import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { updateTask, deleteTask } from "../api/tasks.js";

export default function TaskList({ tasks, onChange }) {
  const { token } = useAuth();
  const [msg, setMsg] = React.useState("");

  async function toggleStatus(t) {
    const next = t.status === "done" ? "todo" : "done";
    try {
      await updateTask(token, t._id, { status: next });
      onChange?.();
    } catch (e) {
      setMsg(e.message);
    }
  }

  async function remove(id) {
    try {
      await deleteTask(token, id);
      onChange?.();
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <div>
      <h3>Your Tasks</h3>
      {tasks.length === 0 && <p>No tasks yet.</p>}
      <ul>
        {tasks.map((t) => (
        <li key={t._id} className={t.status === "done" ? "done" : ""}>
  <div>
    <strong>{t.title}</strong>
    <span className={`status-badge ${t.status}`}>{t.status}</span>
  </div>
  <div>
    <button onClick={() => toggleStatus(t)}>Toggle Done</button>
    <button onClick={() => remove(t._id)}>Delete</button>
  </div>
</li>

        ))}
      </ul>
      {msg && <p>{msg}</p>}
    </div>
  );
}
