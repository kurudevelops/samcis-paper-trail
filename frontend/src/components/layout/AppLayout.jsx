import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout({
  activePath = "/dashboard",
  onNavigate,
  onLogout,
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar
        activePath={activePath}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      <main className="flex-1 p-6 overflow-y-auto bg-gray-200">
        <Outlet />
      </main>
    </div>
  );
}

