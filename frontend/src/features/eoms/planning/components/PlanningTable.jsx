import { ArrowUpDown } from "lucide-react";

import PlanningRow from "./PlanningRow";

export default function PlanningTable({
  rows = [],
  onView,
  onEdit,
  onDelete,
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
                Planning

                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="border-r border-blue-700 px-6 py-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                Academic Year

                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="border-r border-blue-700 px-6 py-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                Submission Date

                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="w-40 px-6 py-3 text-center font-semibold">
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
                colSpan={4}
                className="py-16 text-center text-gray-400"
              >
                No planning documents available.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <PlanningRow
                key={row.id}
                row={row}
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
        ======================================================

        BACKEND TEAM

        Replace the placeholder rows with API data.

        GET /api/planning-documents

        Expected fields:

        id
        planning
        planningType
        academicYear
        submissionDate

        ======================================================
      */}
    </div>
  );
}