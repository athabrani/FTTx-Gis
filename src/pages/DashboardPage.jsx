// src/pages/DashboardPage.jsx
import React, { useMemo } from "react";
import { useAppState } from "../store/AppContext";
import {
  MapIcon,
  CurrencyRupeeIcon,
  SignalIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

function StatCard({ icon: Icon, label, value, sublabel, accent = "sky" }) {
  const accentBg =
    accent === "sky"
      ? "bg-sky-500/10 border-sky-500/40 text-sky-300"
      : accent === "emerald"
      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
      : accent === "amber"
      ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
      : "bg-slate-700/40 border-slate-600/60 text-slate-200";

  return (
    <div className="relative p-4 overflow-hidden border shadow-sm rounded-xl border-fttx-border bg-slate-900/70 shadow-slate-900/60">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="text-xs tracking-wide uppercase text-slate-400">
            {label}
          </div>
          <div className="text-2xl font-semibold text-slate-50">{value}</div>
          {sublabel && (
            <div className="text-[11px] text-slate-400">{sublabel}</div>
          )}
        </div>
        <div
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border text-xs ${accentBg}`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="absolute w-20 h-20 rounded-full pointer-events-none -right-10 -top-10 bg-white/5 blur-2xl" />
    </div>
  );
}

export default function DashboardPage() {
  const {
    state: { planning, assets, pricing },
  } = useAppState();

  const activeRoute = planning.activeRoute;
  const odpList = assets.odp || [];
  const customers = assets.customers || [];
  const cableTypes = pricing.cableTypes || [];

  // --- Derived metrics untuk ringkasan ---

  const totalOdp = odpList.length;
  const totalPorts = odpList.reduce((sum, o) => sum + (o.capacity || 0), 0);
  const usedPorts = odpList.reduce((sum, o) => sum + (o.usedPorts || 0), 0);
  const utilization =
    totalPorts > 0 ? Math.round((usedPorts / totalPorts) * 100) : 0;

  const totalCustomers = customers.length;

  const totalPlannedLengthMeters = useMemo(() => {
    // Untuk saat ini, kita pakai hanya activeRoute.
    // Nanti kalau kamu punya list semua rute, tinggal diganti agregasinya.
    if (!activeRoute) return 0;
    return activeRoute.lengthMeters || 0;
  }, [activeRoute]);

  const totalPlannedCost = useMemo(() => {
    if (!activeRoute) return 0;
    return activeRoute.cost || 0;
  }, [activeRoute]);

  // Breakdown biaya per jenis kabel (contoh sederhana)
  const cableCostBreakdown = useMemo(() => {
    if (!activeRoute) return [];
    const routeCable = cableTypes.find(
      (c) => c.id === activeRoute.cableTypeId
    );
    if (!routeCable) return [];
    return [
      {
        id: routeCable.id,
        name: routeCable.name,
        lengthMeters: activeRoute.lengthMeters,
        cost: activeRoute.cost,
      },
    ];
  }, [activeRoute, cableTypes]);

  const maxCost =
    cableCostBreakdown.length > 0
      ? Math.max(...cableCostBreakdown.map((c) => c.cost))
      : 0;

  return (
    <div className="w-full h-full bg-fttx-bg">
      <div className="flex flex-col h-full gap-6 p-4 mx-auto max-w-7xl lg:p-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h1 className="text-xl font-semibold text-slate-50 md:text-2xl">
              Network Overview
            </h1>
            <p className="text-xs text-slate-400 md:text-sm">
              Ringkasan cepat kondisi jaringan FTTx, kapasitas ODP, dan biaya
              perencanaan jalur terakhir.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-fttx-border bg-slate-950/70 px-3 py-1.5 text-[11px] text-slate-300 shadow-sm">
            <BoltIcon className="h-3.5 w-3.5 text-emerald-400" />
            <span>
              gunakan menu{" "}
              <span className="font-semibold text-sky-400">Perencanaan Jalur</span>{" "}
              untuk menggambar rute baru
            </span>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={MapIcon}
            label="Total Panjang Rute Terencana"
            value={
              totalPlannedLengthMeters > 0
                ? `${totalPlannedLengthMeters.toLocaleString("id-ID")} m`
                : "- m"
            }
            sublabel={
              activeRoute
                ? `Rute aktif: ${activeRoute.name || activeRoute.id}`
                : "Belum ada rute aktif. Gambar rute di halaman Perencanaan."
            }
            accent="sky"
          />
          <StatCard
            icon={CurrencyRupeeIcon}
            label="Estimasi Biaya Rute Aktif"
            value={
              totalPlannedCost > 0
                ? `Rp ${totalPlannedCost.toLocaleString("id-ID")}`
                : "Rp -"
            }
            sublabel="Biaya dihitung dari panjang rute x harga per meter kabel."
            accent="emerald"
          />
          <StatCard
            icon={SignalIcon}
            label="Kapasitas ODP"
            value={`${usedPorts}/${totalPorts || 0} port`}
            sublabel={
              totalPorts > 0
                ? `Utilisasi rata-rata ${utilization}%`
                : "Belum ada ODP yang terdaftar."
            }
            accent="amber"
          />
          <StatCard
            icon={UserGroupIcon}
            label="Total Pelanggan"
            value={totalCustomers.toLocaleString("id-ID")}
            sublabel="Jumlah endpoint pelanggan yang tercatat dalam sistem."
          />
        </div>

        {/* Middle section: Route & Capacity */}
        <div className="grid flex-1 gap-4 lg:grid-cols-3">
          {/* Panel: Rute Aktif */}
          <div className="lg:col-span-2">
            <div className="h-full p-4 border shadow-sm rounded-xl border-fttx-border bg-slate-900/80 shadow-slate-900/40">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div>
                  <div className="text-xs font-semibold tracking-wide uppercase text-slate-400">
                    Rute Perencanaan Aktif
                  </div>
                  <div className="text-sm font-medium text-slate-100">
                    {activeRoute
                      ? activeRoute.name || activeRoute.id
                      : "Belum ada rute yang dipilih"}
                  </div>
                </div>
                {activeRoute && (
                  <span className="inline-flex items-center rounded-full bg-sky-500/10 px-2 py-1 text-[11px] text-sky-300">
                    <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                    {activeRoute.type || "DISTRIBUSI"}
                  </span>
                )}
              </div>

              {activeRoute ? (
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="p-3 border rounded-lg border-slate-800 bg-slate-950/60">
                      <div className="text-[11px] text-slate-400">
                        Panjang Jalur
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-50">
                        {activeRoute.lengthMeters.toLocaleString("id-ID")} m
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg border-slate-800 bg-slate-950/60">
                      <div className="text-[11px] text-slate-400">
                        Jenis Kabel
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-50">
                        {activeRoute.cableTypeId}
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg border-slate-800 bg-slate-950/60">
                      <div className="text-[11px] text-slate-400">
                        Estimasi Biaya
                      </div>
                      <div className="mt-1 text-sm font-semibold text-emerald-400">
                        Rp {activeRoute.cost.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 rounded-lg border border-dashed border-slate-800 bg-slate-950/40 p-3 text-[11px] text-slate-400">
                    <p className="mb-1 font-medium text-slate-300">
                      Catatan cepat
                    </p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>
                        Koordinat rute disimpan sebagai daftar titik
                        geospasial (lon, lat, height).
                      </li>
                      <li>
                        Panjang rute dihitung menggunakan geodesic distance
                        (permukaan bumi).
                      </li>
                      <li>
                        Ubah harga per meter kabel di menu{" "}
                        <span className="font-semibold text-sky-400">
                          Konfigurasi Biaya
                        </span>{" "}
                        untuk melihat dampak biaya secara real-time.
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-xs text-center text-slate-400">
                    Belum ada rute yang aktif.
                    <br />
                    Buka menu{" "}
                    <span className="font-semibold text-sky-400">
                      Perencanaan Jalur
                    </span>{" "}
                    untuk menggambar rute dan melihat ringkasan di sini.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panel: Kapasitas ODP */}
          <div className="flex flex-col gap-4">
            <div className="p-4 border shadow-sm rounded-xl border-fttx-border bg-slate-900/80 shadow-slate-900/40">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div>
                  <div className="text-xs font-semibold tracking-wide uppercase text-slate-400">
                    Ringkasan ODP
                  </div>
                  <div className="text-sm text-slate-100">
                    {totalOdp} ODP terdaftar
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Total Port</span>
                  <span>{totalPorts}</span>
                </div>
                <div className="flex justify-between">
                  <span>Port Terpakai</span>
                  <span>{usedPorts}</span>
                </div>
                <div className="flex justify-between">
                  <span>Utilisasi Rata-rata</span>
                  <span>{utilization}%</span>
                </div>
              </div>

              <div className="h-2 mt-3 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-emerald-500"
                  style={{ width: `${Math.min(utilization, 100)}%` }}
                />
              </div>

              <div className="mt-3 text-[11px] text-slate-400">
                <p>
                  Gunakan halaman{" "}
                  <span className="font-semibold text-sky-400">
                    Manajemen Aset
                  </span>{" "}
                  untuk menambah ODP baru atau memperbarui kapasitas yang
                  sudah ada.
                </p>
              </div>
            </div>

            {/* Panel: Cost breakdown */}
            <div className="p-4 border shadow-sm rounded-xl border-fttx-border bg-slate-900/80 shadow-slate-900/40">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div>
                  <div className="text-xs font-semibold tracking-wide uppercase text-slate-400">
                    Breakdown Biaya Kabel
                  </div>
                  <div className="text-sm text-slate-100">
                    {cableCostBreakdown.length > 0
                      ? "Rute aktif per jenis kabel"
                      : "Belum ada data biaya kabel"}
                  </div>
                </div>
              </div>

              {cableCostBreakdown.length === 0 ? (
                <div className="text-[11px] text-slate-400">
                  Setelah kamu menggambar rute dan memilih jenis kabel, sistem
                  akan menampilkan estimasi biaya per jenis kabel di sini.
                </div>
              ) : (
                <div className="space-y-2 text-[11px] text-slate-300">
                  {cableCostBreakdown.map((item) => {
                    const ratio =
                      maxCost > 0 ? (item.cost / maxCost) * 100 : 0;
                    return (
                      <div key={item.id} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-200">
                            {item.name}
                          </span>
                          <span className="text-slate-400">
                            Rp {item.cost.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-800">
                          <div
                            className="h-1.5 rounded-full bg-sky-500"
                            style={{ width: `${Math.min(ratio, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>
                            Panjang:{" "}
                            {item.lengthMeters.toLocaleString("id-ID")} m
                          </span>
                          <span>
                            Estimasi per m: Rp{" "}
                            {(
                              item.cost / (item.lengthMeters || 1)
                            ).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer ringan */}
        <div className="mt-2 flex items-center justify-between border-t border-slate-800 pt-2 text-[10px] text-slate-500">
          <span>
            FTTx GIS Planner 
          </span>
          <span>
            Tips: gunakan halaman Perencanaan Jalur untuk update data di
            dashboard ini.
          </span>
        </div>
      </div>
    </div>
  );
}
