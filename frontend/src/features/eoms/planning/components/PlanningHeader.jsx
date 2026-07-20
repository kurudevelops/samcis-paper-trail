export default function PlanningHeader({
  onNewPlanningDocument,
}) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Planning Overview
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage planning documents.
        </p>
      </div>

      <button
        type="button"
        onClick={onNewPlanningDocument}
        className="
          rounded-md
          bg-blue-900
          px-5
          py-2
          text-sm
          font-semibold
          text-white
          shadow-sm
          transition
          hover:bg-blue-800
        "
      >
        New
      </button>

      {/*
        BACKEND TEAM:

        The New button should open the planning-document
        creation form or modal.

        The backend must verify that the authenticated user
        has permission to create planning documents.
      */}
    </div>
  );
}