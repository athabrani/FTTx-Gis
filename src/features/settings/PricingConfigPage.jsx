// src/features/settings/PricingConfigPage.jsx
import React from "react";
import { useAppState } from "../../store/AppContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function PricingConfigPage() {
  const {
    state: { pricing },
    dispatch,
  } = useAppState();

  const cableTypes = pricing.cableTypes || [];

  const handlePriceChange = (id, value) => {
    const num = Number(value) || 0;
    dispatch({
      type: "PRICING/UPDATE_CABLE_PRICE",
      payload: { id, pricePerMeter: num },
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Nanti: bisa trigger API ke backend untuk menyimpan konfigurasi permanen.
    alert("Konfigurasi harga kabel disimpan (sementara di state).");
  };

  return (
    <div className="w-full h-full bg-fttx-bg">
      <div className="flex flex-col h-full max-w-5xl gap-4 p-4 mx-auto lg:p-6">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h1 className="text-xl font-semibold text-slate-50">
              Konfigurasi Harga Kabel
            </h1>
            <p className="text-xs text-slate-400">
              Atur harga per meter untuk masing-masing jenis kabel. Nilai ini
              digunakan di seluruh modul perencanaan biaya.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="p-4 space-y-4 text-xs border shadow-sm rounded-xl border-fttx-border bg-slate-900/80"
        >
          {cableTypes.length === 0 ? (
            <div className="text-slate-400">
              Belum ada jenis kabel yang terdaftar di konfigurasi awal.
            </div>
          ) : (
            <div className="space-y-3">
              {cableTypes.map((cable) => (
                <div
                  key={cable.id}
                  className="grid gap-3 border-b border-slate-800/70 pb-3 last:border-0 last:pb-0 md:grid-cols-[2fr,1fr]"
                >
                  <div>
                    <div className="text-[11px] text-slate-400">Jenis Kabel</div>
                    <div className="text-sm font-semibold text-slate-100">
                      {cable.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      ID: {cable.id}
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Input
                      label="Harga per meter (Rp)"
                      type="number"
                      value={cable.pricePerMeter}
                      onChange={(e) =>
                        handlePriceChange(cable.id, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-slate-800">
            <Button type="submit">Simpan Pengaturan</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
