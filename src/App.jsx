// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppState } from "./store/AppContext";

import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./features/auth/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PlanningPage from "./features/planning/PlanningPage";
import AssetsPage from "./features/assets/AssetsPage";
import ReportingPage from "./features/reporting/ReportingPage";
import PricingConfigPage from "./features/settings/PricingConfigPage";
import NotFoundPage from "./pages/NotFoundPage";

function PrivateRoute({ children }) {
  const {
    state: { auth },
  } = useAppState();
  if (!auth.token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/planning"
        element={
          <PrivateRoute>
            <AppLayout>
              <PlanningPage />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/assets"
        element={
          <PrivateRoute>
            <AppLayout>
              <AssetsPage />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/reporting"
        element={
          <PrivateRoute>
            <AppLayout>
              <ReportingPage />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/pricing"
        element={
          <PrivateRoute>
            <AppLayout>
              <PricingConfigPage />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
