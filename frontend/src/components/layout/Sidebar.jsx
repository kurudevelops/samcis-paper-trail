import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";

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

  function toggleMenu(label) {
    setOpenMenu((previousMenu) =>
      previousMenu === label ? null : label
    );
  }

  function isPathActive(path) {
    return (
      activePath === path ||
      activePath.startsWith(`${path}/`)
    );
  }

  return (
    <aside className="flex min-h-screen w-56 flex-col bg-blue-900 text-white">
      {/* Logo */}
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

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          if (item.hasDropdown && item.children) {
            const isOpen = openMenu === item.label;

            const isParentActive =
              isPathActive(item.path) ||
              item.children.some((child) =>
                isPathActive(child.path)
              );

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    toggleMenu(item.label);

                    if (item.path) {
                      onNavigate?.(item.path);
                    }
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    px-5
                    py-3
                    text-sm
                    transition-colors
                    hover:bg-yellow-500
                    hover:text-black
                    ${
                      isParentActive
                        ? "bg-blue-800 font-semibold"
                        : ""
                    }
                  `}
                >
                  <span className="flex-1 text-left">
                    {item.label}
                  </span>

                  {isOpen ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>

                {isOpen && (
                  <div className="mx-2 my-1 ml-4 overflow-hidden rounded-md bg-blue-950">
                    {item.children.map((child) => {
                      const isActive = isPathActive(
                        child.path
                      );

                      return (
                        <button
                          key={child.path}
                          type="button"
                          onClick={() =>
                            onNavigate?.(child.path)
                          }
                          className={`
                            flex
                            w-full
                            items-center
                            px-4
                            py-2
                            text-sm
                            transition-colors
                            hover:bg-yellow-500
                            hover:text-black
                            ${
                              isActive
                                ? "bg-yellow-600 font-semibold text-white"
                                : "bg-blue-950"
                            }
                          `}
                        >
                          <span className="flex-1 text-left">
                            {child.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const isActive = isPathActive(item.path);

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate?.(item.path)}
              className={`
                flex
                w-full
                items-center
                px-5
                py-3
                text-sm
                transition-colors
                hover:bg-yellow-500
                hover:text-black
                ${
                  isActive
                    ? "bg-blue-800 font-semibold"
                    : ""
                }
              `}
            >
              <span className="flex-1 text-left">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        className="
          flex
          items-center
          gap-2
          border-t
          border-blue-800
          px-5
          py-4
          text-sm
          transition-colors
          hover:bg-yellow-500
          hover:text-black
        "
      >
        <LogOut size={14} />
        Log out
      </button>
    </aside>
  );
}