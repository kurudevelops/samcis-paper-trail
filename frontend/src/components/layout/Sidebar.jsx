import { ChevronDown, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "EOMS", path: "/eoms", hasDropdown: true },
  {
    label: "Document Control Requests",
    path: "/document-control-requests",
    hasDropdown: true,
  },
  { label: "Calendar", path: "/calendar" },
  { label: "User Manual", path: "/user-manual" },
];

export default function Sidebar({ activePath = "/dashboard", onNavigate, onLogout }) {
  return (
    <aside className="w-56 bg-blue-900 text-white flex flex-col min-h-screen">
      {/* Logo */}
      <div className="flex flex-col items-center py-6 border-b border-blue-800">
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
          <span className="text-blue-900 font-bold text-xs">LOGO</span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive = item.path === activePath;
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate?.(item.path)}
              className={`w-full flex items-center justify-between px-5 py-3 text-sm text-left transition-colors ${
                isActive ? "bg-blue-800 font-semibold" : "hover:bg-blue-800/60"
              }`}
            >
              <span>{item.label}</span>
              {item.hasDropdown && <ChevronDown size={14} />}
            </button>
          );
        })}
      </nav>

      {/* Logout — pinned to bottom */}
      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-2 px-5 py-4 text-sm border-t border-blue-800 hover:bg-blue-800/60 transition-colors"
      >
        <LogOut size={14} />
        Log out
      </button>
    </aside>
  );
}