import {
  Eye,
  Pencil,
  Trash2,
  ArrowUpDown,
} from "lucide-react";

export default function ObjectiveTable({ rows = [] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300">
      <table className="min-w-full text-sm">

        {/* ============================
            TABLE HEADER
        ============================ */}
        <thead className="bg-blue-900 text-white">
          <tr>

            <th className="px-6 py-3 text-left font-semibold border-r border-blue-700">
              <div className="flex items-center gap-1">
                Frequency
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="px-6 py-3 text-left font-semibold border-r border-blue-700">
              <div className="flex items-center gap-1">
                Document
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="px-6 py-3 text-center font-semibold border-r border-blue-700">
              <div className="flex justify-center items-center gap-1">
                Academic Year
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="px-6 py-3 text-center font-semibold border-r border-blue-700">
              <div className="flex justify-center items-center gap-1">
                Submission Date
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="px-6 py-3 text-center font-semibold w-40">
              <div className="flex justify-center items-center gap-1">
                Actions
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

          </tr>
        </thead>

        {/* ============================
            TABLE BODY
        ============================ */}
        <tbody className="bg-white">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-16 text-center text-gray-400"
              >
                No data available.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={row.id}
                className={`
                  border-b border-gray-300
                  hover:bg-blue-50
                  transition-colors
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                `}
              >
                <td className="px-6 py-5 border-b border-gray-300">
                  {row.frequency}
                </td>

                <td className="px-6 py-5 border-b border-gray-300">
                  {row.document}
                </td>

                <td className="px-6 py-5 text-center border-b border-gray-300">
                  {row.academicYear}
                </td>

                <td className="px-6 py-5 text-center border-b border-gray-300">
                  {row.submissionDate}
                </td>

                {/* ======================================
                    FRONTEND PLACEHOLDER

                    BACKEND TEAM:
                    Keep row.id.
                    Replace the onClick handlers with
                    API calls or routing as needed.
                ======================================= */}

                <td className="px-6 py-5 border-b border-gray-300">
                  <div className="flex justify-center gap-2">

                    <button
                      className="rounded p-2 transition hover:bg-blue-100"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      className="rounded p-2 transition hover:bg-yellow-100"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="rounded p-2 transition hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}