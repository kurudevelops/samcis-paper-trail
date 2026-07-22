import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ActiveYearBadge from "../ActiveYearBadge"; 


export default function Sidebar({
  activePath = "/dashboard",
  onNavigate,
  onLogout,
}) {
  const { user } = useAuth();

  function isPathActive(path) {
    return activePath === path || activePath.startsWith(`${path}/`);
  }

  const visibleItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Repository", path: "/repository" },
    ...(user?.role === "faculty"
      ? [{ label: "Submissions", path: "/submissions" }]
      : []),
    ...((user?.role === "dean" || user?.role === "administrator")
      ? [{ label: "Submission Windows", path: "/submission-windows" }]
      : []),
  ];

  return (
    <aside className="flex min-h-screen w-56 flex-col bg-blue-900 text-white">
      <div className="flex items-center justify-center border-b border-blue-800 px-4 py-5">
        <button
          type="button"
          onClick={() => onNavigate?.("/dashboard")}
          title="Go to Dashboard"
          className="transition hover:scale-105"
        >
          <img
            src="/images/PaperTrailLogo.PNG"
            alt="Paper Trail Logo"
            className="h-24 w-24 object-contain"
          />
        </button>
      </div>

      {/* ADD THIS BLOCK — user info + active year, shown on every page */}
      <div className="border-b border-blue-800 px-4 py-3 text-xs">
        <p className="font-semibold">{user?.first_name} {user?.last_name}</p>
        <p className="text-blue-300 capitalize">{user?.role}</p>
        <div className="mt-2">
          <ActiveYearBadge className="rounded-full bg-blue-700 text-white text-xs font-semibold px-3 py-1" />
        </div>
      </div>

      <nav className="flex-1 py-4">
        {visibleItems.map((item) => {
          const isActive = isPathActive(item.path);

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate?.(item.path)}
              className={`flex w-full items-center px-5 py-3 text-sm transition-colors hover:bg-yellow-500 hover:text-black ${
                isActive ? "bg-blue-800 font-semibold" : ""
              }`}
            >
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-2 border-t border-blue-800 px-5 py-4 text-sm transition-colors hover:bg-yellow-500 hover:text-black"
      >
        <LogOut size={14} />
        Log out
      </button>
    </aside>
  );
}