import { useState } from "react";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },

  {
    label: "EOMS",
    path: "/objectives-and-target-monitoring",
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
      {
        label: "Objectives and Target Monitoring",
        path: "/objectives-and-target-monitoring",
      },
      {
        label: "Quality Records",
        path: "/quality-records",
      },
      {
        label: "Request for Action",
        path: "/request-for-action",
        hasDropdown: true,
      },
    ],
  },

  {
    label: "Document Control Requests",
    path: "/document-control-requests",
  },

  {
    label: "Calendar",
    path: "/calendar",
  },

  {
    label: "User Manual",
    path: "/user-manual",
  },
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
          // =====================================
          // Dropdown Menu (EOMS)
          // =====================================
          if (item.hasDropdown && item.children) {
            const isOpen = openMenu === item.label;

            const isParentActive =
              activePath === item.path ||
              item.children.some((child) => child.path === activePath);

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    toggleMenu(item.label);

                    // Navigate to default EOMS page
                    if (item.path) {
                      onNavigate?.(item.path);
                    }
                  }}
                  className={`w-full flex items-center px-5 py-3 text-sm transition-colors hover:bg-yellow-500 hover:text-black ${
                    isParentActive ? "bg-blue-800 font-semibold" : ""
                  }`}
                >
                  <span className="flex-1 text-left">{item.label}</span>

                  {isOpen ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>

                {isOpen && (
                  <div className="ml-4 mr-2 my-1 rounded-md bg-blue-950 overflow-hidden">
                    {item.children.map((child) => {
                      const isActive = activePath === child.path;

                      return (
                        <button
                          key={child.path}
                          type="button"
                          onClick={() => onNavigate?.(child.path)}
                          className={`w-full flex items-center px-4 py-2 text-sm transition-colors hover:bg-yellow-500 hover:text-black ${
                            isActive
                              ? "bg-yellow-600 text-white font-semibold"
                              : "bg-blue-950"
                          }`}
                        >
                          <span className="flex-1 text-left">
                            {child.label}
                          </span>

                          {child.hasDropdown && (
                            <ChevronDown size={14} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // =====================================
          // Normal Navigation Items
          // =====================================
          const isActive = activePath === item.path;

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate?.(item.path)}
              className={`w-full flex items-center px-5 py-3 text-sm transition-colors hover:bg-yellow-500 hover:text-black ${
                isActive ? "bg-blue-800 font-semibold" : ""
              }`}
            >
              <span className="flex-1 text-left">{item.label}</span>

              {item.hasDropdown && (
                <ChevronDown size={14} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-2 px-5 py-4 text-sm border-t border-blue-800 transition-colors hover:bg-yellow-500 hover:text-black"
      >
        <LogOut size={14} />
        Log out
      </button>
    </aside>
  );
}