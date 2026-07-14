export default function PlanningHeader() {
  return (
    <div className="flex items-start justify-between mb-8">

      <div>

        <h1 className="text-5xl font-bold text-slate-900">
          List of Documents
        </h1>

        <p className="mt-2 text-gray-500">
          Manage Planning Documents.
        </p>

      </div>

      {/* ============================================
          FRONTEND PLACEHOLDER

          BACKEND TEAM:
          Attach navigation or modal opening
          to this button.
      ============================================= */}

      <button
        className="
          bg-blue-900
          hover:bg-blue-800
          text-white
          font-semibold
          px-6
          py-3
          rounded-lg
          shadow
          transition
        "
      >
        + New
      </button>

    </div>
  );
}