const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function api(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // ✅ attach token if present
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Request failed with ${res.status}`);
  }

  return res.json();
}
