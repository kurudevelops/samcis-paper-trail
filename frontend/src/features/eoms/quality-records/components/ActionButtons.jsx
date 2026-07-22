import { Eye, Pencil, Trash2 } from "lucide-react";

export default function ActionButtons({
  record,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onView?.(record)}
        title="View quality record"
        className="
          rounded-md
          p-2
          text-blue-700
          transition
          hover:bg-blue-100
          hover:text-blue-900
        "
      >
        <Eye size={18} />
      </button>

      <button
        type="button"
        onClick={() => onEdit?.(record)}
        title="Edit quality record"
        className="
          rounded-md
          p-2
          text-yellow-700
          transition
          hover:bg-yellow-100
          hover:text-yellow-900
        "
      >
        <Pencil size={18} />
      </button>

      <button
        type="button"
        onClick={() => onDelete?.(record)}
        title="Delete quality record"
        className="
          rounded-md
          p-2
          text-red-700
          transition
          hover:bg-red-100
          hover:text-red-900
        "
      >
        <Trash2 size={18} />
      </button>

      {/*
        BACKEND TEAM:

        These buttons only trigger frontend handlers.

        The backend must verify that the authenticated user
        has permission to view, edit, or delete the record.
      */}
    </div>
  );
}