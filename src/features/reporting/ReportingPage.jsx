// src/features/reporting/ReportingPage.jsx
import React from "react";
import { useAppState } from "../../store/AppContext";

export default function ReportingPage() {
  const {
    state: { assets, planning },
  } = useAppState();

  const totalOdp = assets.odp.length;
  const totalCustomers = assets.customers.length;
  const totalRoutes = planning.activeRoute ? 1 : 0;

  return (
    <div className="w-full h-full bg-fttx-bg">
      <div className="flex flex-col h-full max-w-6xl gap-4 p-4 mx-auto lg:p-6">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h1 className="text-xl font-semibold text-slate-50">
              Analisis & Laporan
            </h1>
            <p className="text-xs text-slate-400">
              Ringkasan metrik untuk membantu pengambilan keputusan
              pembangunan dan ekspansi jaringan FTTx.
            </p>
          </div>
        </div>

        <div className="grid gap-4 text-xs md:grid-cols-3">
          <div className="p-4 border rounded-xl border-fttx-border bg-slate-900/80">
            <div className="text-[11px] uppercase text-slate-400">
              Aset Jaringan
            </div>
            <div className="mt-2 space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>Jumlah ODP</span>
                <span className="font-semibold text-slate-100">
                  {totalOdp}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pelanggan</span>
                <span className="font-semibold text-slate-100">
                  {totalCustomers}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Rute Perencanaan Aktif</span>
                <span className="font-semibold text-slate-100">
                  {totalRoutes}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-xl border-fttx-border bg-slate-900/80 md:col-span-2">
            <div className="text-[11px] uppercase text-slate-400">
              Catatan
            </div>
            <p className="mt-2 text-slate-300">
              Halaman ini dapat dikembangkan untuk:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-slate-300">
              <li>Ekspor laporan ke PDF/Excel.</li>
              <li>
                Visualisasi heatmap utilisasi jaringan per area atau ODP.
              </li>
              <li>Perbandingan biaya per proyek / cluster.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
