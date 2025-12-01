// src/components/analysis/CostPanel.jsx
import React from "react";
import { useAppState } from "../../store/AppContext";

export default function CostPanel() {
  const { state, dispatch } = useAppState();
  const { activeRoute } = state.planning;
  const { cableTypes, selectedCableTypeId } = state.pricing;

  const selectedCable =
    cableTypes.find((c) => c.id === selectedCableTypeId) || cableTypes[0];

  const handlePriceChange = (id, value) => {
    const num = Number(value) || 0;
    dispatch({
      type: "PRICING/UPDATE_CABLE_PRICE",
      payload: { id, pricePerMeter: num },
    });
  };

  const handleCableSelect = (e) => {
    dispatch({
      type: "PRICING/SET_SELECTED_CABLE_TYPE",
      payload: e.target.value,
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
        Estimasi Biaya Jalur
      </h2>

      <div className="space-y-2">
        <label className="text-xs text-slate-400">Jenis Kabel</label>
        <select
          value={selectedCableTypeId}
          onChange={handleCableSelect}
          className="w-full bg-slate-800 text-sm rounded px-2 py-1"
        >
          {cableTypes.map((cable) => (
            <option key={cable.id} value={cable.id}>
              {cable.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-slate-400">Harga per meter</div>
        {cableTypes.map((cable) => (
          <div key={cable.id} className="flex items-center gap-2 text-xs">
            <span className="w-28 truncate">{cable.name}</span>
            <input
              type="number"
              className="flex-1 bg-slate-800 rounded px-2 py-1 text-right"
              value={cable.pricePerMeter}
              onChange={(e) => handlePriceChange(cable.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-slate-800 pt-4 space-y-2 text-xs">
        <div className="flex justify-between">
          <span>Nama Rute</span>
          <span>{activeRoute ? activeRoute.name : "-"}</span>
        </div>
        <div className="flex justify-between">
          <span>Panjang Rute</span>
          <span>
            {activeRoute ? `${activeRoute.lengthMeters.toLocaleString()} m` : "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Jenis Kabel</span>
          <span>{activeRoute ? activeRoute.cableTypeId : "-"}</span>
        </div>
        <div className="flex justify-between font-semibold text-emerald-400">
          <span>Estimasi Biaya</span>
          <span>
            {activeRoute
              ? `Rp ${activeRoute.cost.toLocaleString("id-ID")}`
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
