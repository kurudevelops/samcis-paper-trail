import { Eye, Pencil, Trash2 } from "lucide-react";

export default function PlanningActions({
  row,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        title="View planning document"
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
        <Eye size={17} />
      </button>

      <button
        type="button"
        title="Edit planning document"
        onClick={() => onEdit?.(row)}
        className="
          rounded
          p-2
          text-yellow-700
          transition
          hover:bg-yellow-100
          hover:text-yellow-900
        "
      >
        <Pencil size={17} />
      </button>

      <button
        type="button"
        title="Delete planning document"
        onClick={() => onDelete?.(row)}
        className="
          rounded
          p-2
          text-red-700
          transition
          hover:bg-red-100
          hover:text-red-900
        "
      >
        <Trash2 size={17} />
      </button>

      {/*
        BACKEND TEAM:

        View:
        GET /api/planning-documents/{id}

        Edit:
        PUT /api/planning-documents/{id}

        Delete:
        DELETE /api/planning-documents/{id}

        The backend must verify the authenticated user's
        permissions before allowing protected actions.
      */}
    </div>
  );
}