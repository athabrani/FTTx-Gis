// src/features/assets/AssetsPage.jsx
import React, { useState } from "react";
import { useAppState } from "../../store/AppContext";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { canAddOdp } from "../../utils/auth";

export default function AssetsPage() {
  const {
    state: { assets, auth },
    dispatch,
  } = useAppState();

  const [form, setForm] = useState({
    name: "",
    lon: "",
    lat: "",
    capacity: 16,
  });

  const allowAdd = canAddOdp(auth.role);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddOdp = (e) => {
    e.preventDefault();
    if (!allowAdd) return;

    const id = `ODP_${Date.now()}`;
    const newOdp = {
      id,
      name: form.name || id,
      lon: Number(form.lon) || 0,
      lat: Number(form.lat) || 0,
      capacity: Number(form.capacity) || 0,
      usedPorts: 0,
    };

    dispatch({ type: "ASSETS/ADD_ODP", payload: newOdp });
    setForm({ name: "", lon: "", lat: "", capacity: 16 });
  };

  const odpList = assets.odp || [];

  return (
    <div className="w-full h-full bg-fttx-bg">
      <div className="flex flex-col h-full max-w-6xl gap-4 p-4 mx-auto lg:p-6">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h1 className="text-xl font-semibold text-slate-50">
              Manajemen Aset ODP
            </h1>
            <p className="text-xs text-slate-400">
              Kelola daftar ODP yang menjadi titik distribusi jaringan FTTx.
              Koordinat juga dapat dibuat dari peta secara langsung.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr,1.4fr]">
          {/* Tabel ODP */}
          <div className="p-4 border shadow-sm rounded-xl border-fttx-border bg-slate-900/80">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-semibold text-slate-300">
                Daftar ODP ({odpList.length})
              </span>
            </div>

            {odpList.length === 0 ? (
              <div className="text-xs text-slate-500">
                Belum ada ODP yang terdaftar. Tambahkan melalui form di
                sebelah kanan atau dengan klik di peta pada halaman Perencanaan
                Jalur.
              </div>
            ) : (
              <div className="overflow-x-auto text-xs">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] uppercase text-slate-400">
                      <th className="px-2 py-2 text-left">Nama</th>
                      <th className="px-2 py-2 text-left">Lon</th>
                      <th className="px-2 py-2 text-left">Lat</th>
                      <th className="px-2 py-2 text-right">Port</th>
                      <th className="px-2 py-2 text-right">Terpakai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {odpList.map((odp) => (
                      <tr
                        key={odp.id}
                        className="border-b border-slate-800/70 hover:bg-slate-900/80"
                      >
                        <td className="px-2 py-2 text-slate-100">
                          {odp.name}
                        </td>
                        <td className="px-2 py-2 text-slate-300">
                          {odp.lon.toFixed(6)}
                        </td>
                        <td className="px-2 py-2 text-slate-300">
                          {odp.lat.toFixed(6)}
                        </td>
                        <td className="px-2 py-2 text-right text-slate-200">
                          {odp.capacity}
                        </td>
                        <td className="px-2 py-2 text-right text-slate-400">
                          {odp.usedPorts}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Form tambah ODP */}
          <div className="p-4 border shadow-sm rounded-xl border-fttx-border bg-slate-900/80">
            <div className="mb-3 text-xs font-semibold tracking-wide uppercase text-slate-400">
              Tambah ODP Manual
            </div>
            <form onSubmit={handleAddOdp} className="space-y-3 text-xs">
              <Input
                label="Nama ODP"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="ODP-RT01-RW03"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Longitude"
                  value={form.lon}
                  onChange={handleChange("lon")}
                  placeholder="106.8"
                />
                <Input
                  label="Latitude"
                  value={form.lat}
                  onChange={handleChange("lat")}
                  placeholder="-6.2"
                />
              </div>
              <Input
                label="Kapasitas Port"
                type="number"
                value={form.capacity}
                onChange={handleChange("capacity")}
              />

              {!allowAdd && (
                <div className="text-[11px] text-amber-400">
                  Role kamu tidak diizinkan menambah ODP. Hubungi Admin atau
                  Engineer.
                </div>
              )}

              <Button
                type="submit"
                className="w-full mt-1"
                disabled={!allowAdd}
              >
                Simpan ODP
              </Button>
            </form>

            <div className="mt-3 text-[11px] text-slate-500">
              ODP juga dapat dibuat dari peta dengan memilih mode{" "}
              <span className="font-semibold text-sky-400">Tambah ODP</span> di
              toolbar peta.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
