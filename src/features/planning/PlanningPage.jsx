// src/features/planning/PlanningPage.jsx
import React from "react";
import CesiumMap from "../../components/map/CesiumMap";
import MapToolbar from "../../components/map/MapToolbar";
import CostPanel from "../../components/analysis/CostPanel";
import CapacityPanel from "../../components/analysis/CapacityPanel";

export default function PlanningPage() {
  return (
    <div className="flex h-full">
      <div className="relative flex-1">
        <CesiumMap />
        <MapToolbar />
      </div>
      <div className="flex flex-col border-l w-96 border-fttx-border bg-slate-950/95 backdrop-blur">
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800">
          <CostPanel />
          <CapacityPanel />
        </div>
      </div>
    </div>
  );
}
