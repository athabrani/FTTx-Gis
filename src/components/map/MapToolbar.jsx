// src/components/map/MapToolbar.jsx
import React from "react";
import { useAppState } from "../../store/AppContext";

export default function MapToolbar() {
  const { state, dispatch } = useAppState();
  const { drawMode } = state.map;

  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
      <button
        onClick={() =>
          dispatch({
            type: "MAP/SET_DRAW_MODE",
            payload: drawMode === "odp" ? "none" : "odp",
          })
        }
        className={`px-3 py-2 rounded text-sm ${
          drawMode === "odp"
            ? "bg-emerald-500 text-white"
            : "bg-slate-800 text-slate-100"
        }`}
      >
        Tambah ODP
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "MAP/SET_DRAW_MODE",
            payload: drawMode === "route" ? "none" : "route",
          })
        }
        className={`px-3 py-2 rounded text-sm ${
          drawMode === "route"
            ? "bg-sky-500 text-white"
            : "bg-slate-800 text-slate-100"
        }`}
      >
        Gambar Jalur Kabel
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "MAP/SET_DRAW_MODE",
            payload: "none",
          })
        }
        className="px-3 py-2 rounded text-sm bg-slate-700 text-slate-100"
      >
        Selesai
      </button>
    </div>
  );
}
