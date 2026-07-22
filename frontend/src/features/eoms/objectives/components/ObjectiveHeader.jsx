export default function ObjectiveHeader() {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-4">
      {/* ==========================================================
          OBJECTIVES & TARGETS MONITORING
          ----------------------------------------------------------
          FRONTEND TEAM:
          Displays the page title.

          BACKEND TEAM:
          No backend logic needed here.
      ========================================================== */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Objectives &amp; Targets Monitoring
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage Objectives &amp; Targets Monitoring records.
        </p>
      </div>

      {/* ==========================================================
          BACKEND TEAM

          Connect this button to the Create Objective page or modal.

          Example:

          navigate("/objectives-and-target-monitoring/new");

      ========================================================== */}

      <button
        className="rounded-md bg-blue-900 px-5 py-2 text-white font-medium shadow transition hover:bg-blue-800"
      >
        + New
      </button>
    </div>
  );
}