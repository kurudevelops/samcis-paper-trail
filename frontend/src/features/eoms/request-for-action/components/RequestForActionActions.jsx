import { Eye } from "lucide-react";

export default function RequestForActionActions({
  row,
  onView,
}) {
  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        title="View Request for Action"
        onClick={() => onView?.(row)}
        className="
          rounded
          p-2
          text-blue-700
          transition
          hover:bg-blue-100
          hover:text-blue-900
        "
      >
        <Eye size={18} />
      </button>

      {/*
      ======================================================

      BACKEND TEAM

      View Request for Action

      GET /api/request-for-actions/{id}

      The backend should return the complete
      Request for Action details.

      The backend must also verify that the
      authenticated user has permission to
      access this record.

      ======================================================
      */}
    </div>
  );
}