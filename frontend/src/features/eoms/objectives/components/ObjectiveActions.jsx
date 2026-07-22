import { Eye, Pencil, Trash2 } from "lucide-react";

export default function ObjectiveActions({
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-center gap-3">

      {/* BACKEND TEAM
          Connect these handlers to the appropriate pages/modals.
      */}

      <button
        onClick={onView}
        className="text-slate-600 hover:text-blue-700 transition"
        title="View"
      >
        <Eye size={16} />
      </button>

      <button
        onClick={onEdit}
        className="text-slate-600 hover:text-yellow-600 transition"
        title="Edit"
      >
        <Pencil size={16} />
      </button>

      <button
        onClick={onDelete}
        className="text-slate-600 hover:text-red-600 transition"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>

    </div>
  );
}