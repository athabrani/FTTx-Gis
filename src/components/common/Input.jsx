// src/components/common/Input.jsx
import React from "react";

export default function Input({
  label,
  type = "text",
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1 text-xs">
      {label && (
        <label className="block text-slate-300">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full rounded-md border border-fttx-border bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 ${className}`}
        {...props}
      />
      {error && <div className="text-[11px] text-red-400">{error}</div>}
    </div>
  );
}
