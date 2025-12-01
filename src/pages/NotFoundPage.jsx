// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-fttx-bg">
      <div className="max-w-md space-y-3 text-center">
        <h1 className="text-3xl font-bold text-slate-50">404</h1>
        <p className="text-sm text-slate-300">
          Halaman yang kamu cari tidak ditemukan.
        </p>
        <p className="text-xs text-slate-500">
          Periksa kembali URL atau kembali ke dashboard utama.
        </p>
        <Link to="/">
          <Button variant="primary" className="mt-2">
            Kembali ke Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
