import { api } from "./client.js";

export const listTasks = (token) => api("/api/v1/tasks", { token });
export const createTask = (token, payload) =>
  api("/api/v1/tasks", { method: "POST", body: payload, token });
export const updateTask = (token, id, payload) =>
  api(`/api/v1/tasks/${id}`, { method: "PUT", body: payload, token });
export const deleteTask = (token, id) =>
  api(`/api/v1/tasks/${id}`, { method: "DELETE", token });
