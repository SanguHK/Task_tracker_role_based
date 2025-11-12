import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { listTasks } from "../api/tasks.js";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

export default function Dashboard() {
  const { token, user, logout } = useAuth();
  const [tasks, setTasks] = React.useState([]);
  const [msg, setMsg] = React.useState("");

  async function refresh() {
    try {
      const data = await listTasks(token);
      setTasks(data.tasks);
    } catch (e) {
      setMsg(e.message);
    }
  }

  React.useEffect(() => {
    if (token) refresh();
  }, [token]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <b>User:</b> {user?.name} ({user?.role}){" "}
        <button onClick={logout}>Logout</button>
      </div>
      <TaskForm onSuccess={refresh} />
      <TaskList tasks={tasks} onChange={refresh} />
      {msg && <p>{msg}</p>}
    </div>
  );
}
