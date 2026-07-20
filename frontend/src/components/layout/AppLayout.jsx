import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Sidebar from "./Sidebar";

export default function AppLayout({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleNavigate(path) {
    navigate(path);
  }

  return (
    <div className="flex min-h-screen bg-gray-200">
      <Sidebar
        activePath={location.pathname}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />

      <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}