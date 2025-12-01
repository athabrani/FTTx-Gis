// src/api/httpClient.js
import { API_BASE_URL } from "../config/appConfig";

export async function apiRequest(path, { method = "GET", token, body } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `API error: ${res.status}`);
  }

  return res.json();
}
