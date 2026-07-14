import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <Sidebar
        activePath={location.pathname}
        onNavigate={(path) => navigate(path)}
        onLogout={onLogout}
      />
      <main className="flex-1 p-6 overflow-y-auto bg-gray-200">
        <Outlet />
      </main>
    </div>
  );
}