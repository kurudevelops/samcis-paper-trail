import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  function handleNavigate(path) {
    navigate(path);
  }

  function handleLogout() {
    logout();
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-gray-200">
      <Sidebar
        activePath={location.pathname}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}