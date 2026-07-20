import {
  Eye,
  Download,
} from "lucide-react";

export default function ControlledDocumentsActions({
  row,
  onView,
  onDownload,
}) {
  return (
    <div className="flex justify-center gap-2">
      {/* ==========================================
          BACKEND TEAM

          View
          GET /api/controlled-documents/{id}

          Open the selected controlled document.

      ========================================== */}

      <button
        type="button"
        title="View"
        onClick={() => onView?.(row)}
        className="
          rounded
          p-2
          transition
          hover:bg-blue-100
          hover:text-blue-900
        "
      >
        <Eye size={18} />
      </button>

      {/* ==========================================
          BACKEND TEAM

          Download
          GET /api/controlled-documents/{id}/download

          Return the original file.

      ========================================== */}

      <button
        type="button"
        title="Download"
        onClick={() => onDownload?.(row)}
        className="
          rounded
          p-2
          transition
          hover:bg-green-100
          hover:text-green-700
        "
      >
        <Download size={18} />
      </button>
    </div>
  );
}