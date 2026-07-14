import {
  Eye,
  Download,
  ArrowUpDown,
} from "lucide-react";

export default function PlanningTable({ rows = [] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300">

      <table className="min-w-full text-sm">

        {/* ==========================================
            TABLE HEADER
        ========================================== */}

        <thead className="bg-blue-900 text-white">

          <tr>

            <th className="px-6 py-3 text-left font-semibold border-r border-blue-700">
              <div className="flex items-center gap-1">
                Document Code
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="px-6 py-3 text-left font-semibold border-r border-blue-700">
              <div className="flex items-center gap-1">
                Title
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="px-6 py-3 text-center font-semibold border-r border-blue-700">
              <div className="flex justify-center items-center gap-1">
                Type
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="px-6 py-3 text-center font-semibold border-r border-blue-700">
              <div className="flex justify-center items-center gap-1">
                Revision
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="px-6 py-3 text-center font-semibold border-r border-blue-700">
              <div className="flex justify-center items-center gap-1">
                Effectivity
                <ArrowUpDown
                  size={13}
                  className="text-yellow-400"
                  strokeWidth={2.2}
                />
              </div>
            </th>

            <th className="px-6 py-3 text-center font-semibold w-36">
              <div className="flex justify-center items-center gap-1">
                Actions
              </div>
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
                No planning documents available.
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

                {/* ==========================================
                    FRONTEND PLACEHOLDER

                    BACKEND TEAM

                    View:
                    Navigate to document details.

                    Download:
                    Return document file or PDF.
                ========================================== */}

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-2">

                    <button
                      title="View"
                      className="rounded p-2 transition hover:bg-blue-100"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      title="Download"
                      className="rounded p-2 transition hover:bg-green-100"
                    >
                      <Download size={18} />
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