// src/components/layout/Topbar.jsx
import React from "react";
import { useAppState } from "../../store/AppContext";

export default function Topbar() {
  const {
    state: { auth },
    dispatch,
  } = useAppState();

  const handleLogout = () => {
    dispatch({ type: "AUTH/LOGOUT" });
  };

  return (
    <header className="flex items-center justify-between px-4 border-b h-14 border-fttx-border bg-slate-950/80 backdrop-blur">
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <div className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded bg-sky-500">
          F
        </div>
        <div>
          <div className="font-semibold text-slate-100">
            FTTx Network Planner
          </div>
          <div className="text-[10px] text-slate-400">
            Cesium-based GIS for FTTx
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-xs text-right text-slate-400">
          <div className="font-medium text-slate-100">
            {auth.user?.name || "Guest"}
          </div>
          <div className="tracking-wide uppercase">
            {auth.role || "NO ROLE"}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 text-xs rounded-md bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
