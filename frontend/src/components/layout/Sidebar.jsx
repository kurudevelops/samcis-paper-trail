import { useState } from "react";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },

  {
    label: "EOMS",
    hasDropdown: true,
    children: [
      {
        label: "Controlled Documents",
        path: "/controlled-documents",
      },
      {
        label: "Planning Documents",
        path: "/planning-documents",
      },
    ],
  },

  {
    label: "Document Control Requests",
    path: "/document-control-requests",
    hasDropdown: true,
  },

  { label: "Calendar", path: "/calendar" },
  { label: "User Manual", path: "/user-manual" },
];

export default function Sidebar({
  activePath = "/dashboard",
  onNavigate,
  onLogout,
}) {
  const [openMenu, setOpenMenu] = useState("EOMS");

  const toggleMenu = (label) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <aside className="w-56 bg-blue-900 text-white flex flex-col min-h-screen">
      {/* Logo */}
      <div className="flex flex-col items-center py-6 border-b border-blue-800">
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
          <span className="text-blue-900 font-bold text-xs">LOGO</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          // Dropdown Item
          if (item.hasDropdown && item.children) {
            const isOpen = openMenu === item.label;

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => toggleMenu(item.label)}
                  className="w-full flex items-center justify-between px-5 py-3 text-sm hover:bg-yellow-500 hover:text-black transition-colors"
                >
                  <span>{item.label}</span>

                  {isOpen ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>

                {isOpen && (
                  <div className="bg-blue-950">
                    {item.children.map((child) => {
                      const isActive = child.path === activePath;

                      return (
                        <button
                          key={child.path}
                          type="button"
                          onClick={() => onNavigate?.(child.path)}
                          className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                         isActive
                          ? "bg-blue-800 font-semibold hover:bg-yellow-500 hover:text-black"
                          : "hover:bg-yellow-500 hover:text-black"
                        }`}
                        >
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
          const isActive = item.path === activePath;

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate?.(item.path)}
              className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors hover:bg-yellow-500 hover:text-black ${
  isActive ? "bg-blue-800 font-semibold" : ""
}`}
            >
              <span>{item.label}</span>

              {item.hasDropdown && <ChevronDown size={14} />}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
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