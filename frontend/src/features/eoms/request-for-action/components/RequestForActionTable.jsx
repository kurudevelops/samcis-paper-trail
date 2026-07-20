import { ArrowUpDown } from "lucide-react";

import RequestForActionRow from "./RequestForActionRow";

export default function RequestForActionTable({
  rows = [],
  onView,
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
                RA Form Ref. No.

                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="border-r border-blue-700 px-6 py-3 text-left font-semibold">
              <div className="flex items-center gap-1">
                RA Type

                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="border-r border-blue-700 px-6 py-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                Issue Date

                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="border-r border-blue-700 px-6 py-3 text-left font-semibold">
              <div className="flex items-center gap-1">
                Issued By

                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="border-r border-blue-700 px-6 py-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                Status

                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="w-28 px-6 py-3 text-center font-semibold">
              Action
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
                No Request for Action records available.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <RequestForActionRow
                key={row.id}
                row={row}
                index={index}
                onView={onView}
              />
            ))
          )}
        </tbody>
      </table>

      {/*
        ======================================================

        BACKEND TEAM

        Replace the placeholder rows with API data.

        GET /api/request-for-actions

        Expected fields:

        id
        referenceNo
        raType
        issueDate
        issuedBy
        status

        ======================================================
      */}
    </div>
  );
}