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
    <header className="h-14 border-b border-fttx-border bg-slate-950/80 backdrop-blur flex items-center justify-between px-4">
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <div className="w-6 h-6 rounded bg-sky-500 flex items-center justify-center text-xs font-bold">
          F
        </div>
        <div>
          <div className="font-semibold text-slate-100">
            FTTx Network Planner
          </div>
          <div className="text-[10px] text-slate-400">
            Cesium-based 2D GIS for FTTx
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-xs text-slate-400 text-right">
          <div className="text-slate-100 font-medium">
            {auth.user?.name || "Guest"}
          </div>
          <div className="uppercase tracking-wide">
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
