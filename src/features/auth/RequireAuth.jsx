// src/features/auth/RequireRole.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppState } from "../../store/AppContext";
import { hasAnyRole } from "../../utils/auth";

export default function RequireRole({ allowedRoles, children }) {
  const {
    state: { auth },
  } = useAppState();

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAnyRole(auth.role, allowedRoles)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
