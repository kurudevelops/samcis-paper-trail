import { FileText } from "lucide-react";
import QualityRow from "./QualityRow";

export default function QualityTable({
  rows = [],
  isLoading = false,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full border-collapse text-sm">
        {/* ==========================================
            TABLE HEADER
        ========================================== */}

        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="border-r border-blue-800 px-6 py-4 text-left font-semibold">
              QR Code
            </th>

            <th className="border-r border-blue-800 px-6 py-4 text-center font-semibold">
              As of Date
            </th>

            <th className="border-r border-blue-800 px-6 py-4 text-left font-semibold">
              Title
            </th>

            <th className="border-r border-blue-800 px-6 py-4 text-center font-semibold">
              Submission Date
            </th>

            <th className="px-6 py-4 text-center font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        {/* ==========================================
            TABLE BODY
        ========================================== */}

        <tbody className="bg-white">
          {isLoading ? (
            [...Array(8)].map((_, index) => (
              <tr
                key={index}
                className="border-b border-gray-200"
              >
                <td
                  colSpan={5}
                  className="px-6 py-5"
                >
                  <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
                </td>
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-16 text-center text-gray-500"
              >
                <FileText
                  size={42}
                  className="mx-auto mb-3 text-gray-400"
                />

                <p className="font-medium">
                  No quality records found.
                </p>
              </td>
            </tr>
          ) : (
            rows.map((record, index) => (
              <QualityRow
                key={record.id}
                record={record}
                index={index}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>

      {/*
      =====================================================

      BACKEND TEAM

      Replace the placeholder handlers with API actions.

      View:
      GET /api/quality-records/{id}

      Edit:
      PUT /api/quality-records/{id}

      Delete:
      DELETE /api/quality-records/{id}

      =====================================================
      */}
    </div>
  );
}