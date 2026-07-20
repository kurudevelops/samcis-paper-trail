import { ArrowUpDown } from "lucide-react";
import ControlledDocumentsActions from "./ControlledDocumentsActions";

export default function ControlledDocumentsTable({
  rows = [],
  onView,
  onDownload,
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300">
      <table className="min-w-full text-sm">
        {/* ==========================================
            TABLE HEADER
        ========================================== */}

        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="border-r border-blue-700 px-6 py-3 text-left font-semibold">
              <div className="flex items-center gap-1">
                Document Code
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="border-r border-blue-700 px-6 py-3 text-left font-semibold">
              <div className="flex items-center gap-1">
                Title
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="border-r border-blue-700 px-6 py-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                Type
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="border-r border-blue-700 px-6 py-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                Revision
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="border-r border-blue-700 px-6 py-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                Effectivity
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="w-36 px-6 py-3 text-center font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        {/* ==========================================
            TABLE BODY
        ========================================== */}

        <tbody className="bg-white">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-16 text-center text-gray-400"
              >
                No controlled documents available.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={row.id}
                className={`
                  border-b border-gray-300
                  transition-colors
                  hover:bg-blue-50
                  ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }
                `}
              >
                <td className="px-6 py-5">
                  {row.documentCode}
                </td>

                <td className="px-6 py-5">
                  {row.title}
                </td>

                <td className="px-6 py-5 text-center">
                  {row.type}
                </td>

                <td className="px-6 py-5 text-center">
                  {row.revision}
                </td>

                <td className="px-6 py-5 text-center">
                  {row.effectivity}
                </td>

                <td className="px-6 py-5">
                  <ControlledDocumentsActions
                    row={row}
                    onView={onView}
                    onDownload={onDownload}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/*
      ======================================================

      BACKEND TEAM

      The page component should pass handlers to:

      onView(row)
      onDownload(row)

      Example:

      onView:
      GET /api/controlled-documents/{id}

      onDownload:
      GET /api/controlled-documents/{id}/download

      The backend should validate that the authenticated
      user has permission to access the requested document.

      ======================================================
      */}
    </div>
  );
}