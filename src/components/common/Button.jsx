// src/components/common/Button.jsx
import React from "react";
import clsx from "clsx";

const base =
  "inline-flex items-center justify-center rounded-md text-sm font-medium px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950";

const variants = {
  primary: "bg-sky-600 text-white hover:bg-sky-500 focus:ring-sky-500",
  secondary:
    "bg-slate-800 text-slate-100 hover:bg-slate-700 focus:ring-slate-600",
  danger:
    "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500",
  ghost:
    "bg-transparent text-slate-100 hover:bg-slate-800 focus:ring-slate-600",
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}) {
  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
