// src/components/analysis/CapacityPanel.jsx
import React from "react";
import { useAppState } from "../../store/AppContext";

export default function CapacityPanel() {
  const {
    state: {
      assets: { odp },
    },
  } = useAppState();

  const totalOdp = odp.length;
  const totalPorts = odp.reduce((sum, o) => sum + (o.capacity || 0), 0);
  const usedPorts = odp.reduce((sum, o) => sum + (o.usedPorts || 0), 0);
  const utilization =
    totalPorts > 0 ? Math.round((usedPorts / totalPorts) * 100) : 0;

  return (
    <div className="p-4 space-y-3 text-xs">
      <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
        Kapasitas Jaringan (ODP)
      </h2>
      <div className="flex justify-between">
        <span>Jumlah ODP</span>
        <span>{totalOdp}</span>
      </div>
      <div className="flex justify-between">
        <span>Total Port</span>
        <span>{totalPorts}</span>
      </div>
      <div className="flex justify-between">
        <span>Port Terpakai</span>
        <span>{usedPorts}</span>
      </div>
      <div className="flex justify-between">
        <span>Utilisasi</span>
        <span>{utilization}%</span>
      </div>
      <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500"
          style={{ width: `${Math.min(utilization, 100)}%` }}
        />
      </div>
    </div>
  );
}
