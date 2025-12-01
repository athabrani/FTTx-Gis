// src/components/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppState } from "../../store/AppContext";
import { ROLES, canEditPricing } from "../../utils/auth";
import {
  HomeIcon,
  MapIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";

const navItemClass =
  "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-800 transition-colors";

export default function Sidebar() {
  const {
    state: { auth },
  } = useAppState();

  const role = auth.role;

  return (
    <aside className="w-64 bg-fttx-bg border-r border-fttx-border flex flex-col">
      <div className="px-4 py-4 border-b border-fttx-border">
        <div className="text-lg font-semibold text-sky-400">FTTx GIS</div>
        <div className="text-xs text-slate-400">
          {auth.user?.name || "Guest"} • {role || "-"}
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navItemClass} ${
              isActive ? "bg-slate-800 text-sky-400" : "text-slate-200"
            }`
          }
        >
          <HomeIcon className="w-4 h-4" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/planning"
          className={({ isActive }) =>
            `${navItemClass} ${
              isActive ? "bg-slate-800 text-sky-400" : "text-slate-200"
            }`
          }
        >
          <MapIcon className="w-4 h-4" />
          <span>Perencanaan Jalur</span>
        </NavLink>

        <NavLink
          to="/assets"
          className={({ isActive }) =>
            `${navItemClass} ${
              isActive ? "bg-slate-800 text-sky-400" : "text-slate-200"
            }`
          }
        >
          <RectangleGroupIcon className="w-4 h-4" />
          <span>Manajemen Aset</span>
        </NavLink>

        <NavLink
          to="/reporting"
          className={({ isActive }) =>
            `${navItemClass} ${
              isActive ? "bg-slate-800 text-sky-400" : "text-slate-200"
            }`
          }
        >
          <ChartBarIcon className="w-4 h-4" />
          <span>Analisis & Laporan</span>
        </NavLink>

        {canEditPricing(role) && (
          <NavLink
            to="/settings/pricing"
            className={({ isActive }) =>
              `${navItemClass} ${
                isActive ? "bg-slate-800 text-sky-400" : "text-slate-200"
              }`
            }
          >
            <Cog6ToothIcon className="w-4 h-4" />
            <span>Konfigurasi Biaya</span>
          </NavLink>
        )}
      </nav>
    </aside>
  );
}
