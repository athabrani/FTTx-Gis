// src/features/auth/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../store/AppContext";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { ROLES } from "../../utils/auth";

export default function LoginPage() {
  const { dispatch } = useAppState();
  const navigate = useNavigate();

  const [name, setName] = useState("Network Engineer");
  const [email, setEmail] = useState("engineer@example.com");
  const [role, setRole] = useState(ROLES.ENGINEER);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Untuk sekarang: mock login (tidak memanggil API)
    // Kalau nanti ada backend, tinggal ganti dengan authApi.
    const fakeToken = "dummy-token";

    dispatch({
      type: "AUTH/LOGIN_SUCCESS",
      payload: {
        user: { name, email },
        token: fakeToken,
        role,
      },
    });

    setLoading(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-fttx-bg">
      <div className="w-full max-w-md p-6 border shadow-xl rounded-2xl border-fttx-border bg-slate-950/90 shadow-black/40">
        <div className="mb-5 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 mb-2 border rounded-xl bg-sky-500/20 text-sky-300 border-sky-500/60">
            <span className="text-sm font-bold">F</span>
          </div>
          <h1 className="text-lg font-semibold text-slate-50">
            FTTx GIS Planner
          </h1>
          <p className="text-xs text-slate-400">
            Masuk untuk mengakses peta jaringan, perencanaan jalur, dan
            analisis kapasitas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <Input
            label="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />

          <div className="space-y-1">
            <label className="block text-xs text-slate-300">
              Role / Akses
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-md border-fttx-border bg-slate-900 text-slate-100 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value={ROLES.ADMIN}>Admin</option>
              <option value={ROLES.ENGINEER}>Engineer</option>
              <option value={ROLES.TECHNICIAN}>Technician</option>
              <option value={ROLES.VIEWER}>Viewer (read-only)</option>
            </select>
            <p className="text-[11px] text-slate-500">
              Role menentukan fitur yang tersedia.
            </p>
          </div>

          <Button
            variant="primary"
            type="submit"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk ke Dashboard"}
          </Button>
        </form>

        <div className="mt-4 text-[10px] text-slate-500 text-center">
          © 2025 FTTx Parama Net •
        </div>
      </div>
    </div>
  );
}
