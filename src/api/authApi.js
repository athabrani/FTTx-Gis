// src/api/authApi.js
import { apiRequest } from "./httpClient";

export function loginApi({ email, password }) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}
