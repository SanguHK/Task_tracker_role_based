import { api } from "./client.js";

export const register = (payload) =>
  api("/api/v1/auth/register", { method: "POST", body: payload });

export const login = (payload) =>
  api("/api/v1/auth/login", { method: "POST", body: payload });
