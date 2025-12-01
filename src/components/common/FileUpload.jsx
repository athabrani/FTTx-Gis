// src/components/common/FileUpload.jsx
import React, { useState } from "react";
import { useAppState } from "../../store/AppContext";
import { apiRequest } from "../../api/httpClient";

export default function FileUpload({ label, endpoint }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const {
    state: { auth },
  } = useAppState();

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: formData,
      });
      const data = await res.json();
      setStatus(`Berhasil: ${data.inserted} data, gagal: ${data.errors}`);
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-2 text-xs">
      <div className="font-medium text-slate-200">{label}</div>
      <input
        type="file"
        accept=".kml,.kmz,.xlsx,.xls,.csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full text-xs text-slate-100"
      />
      <button
        onClick={handleUpload}
        className="px-3 py-1 rounded bg-sky-600 text-xs"
      >
        Upload
      </button>
      {status && <div className="text-slate-400">{status}</div>}
    </div>
  );
}
