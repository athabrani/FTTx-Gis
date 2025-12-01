// src/components/layout/AppLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 bg-slate-950">{children}</main>
      </div>
    </div>
  );
}
