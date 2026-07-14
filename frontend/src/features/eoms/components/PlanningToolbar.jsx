export default function PlanningToolbar() {
  return (
    <div className="mb-6 rounded-lg border border-gray-300 bg-gray-50 p-5">

      <div className="flex flex-wrap items-end gap-4">

        {/* ==========================================
            Search
        =========================================== */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Search:
          </label>

          <input
            type="text"
            placeholder="Search documents..."
            className="
              w-64
              rounded-md
              border
              border-gray-300
              bg-white
              px-3
              py-2
              outline-none
              focus:border-blue-700
            "
          />
        </div>

        {/* ==========================================
            Unit Filter

            BACKEND TEAM:
            Populate this dropdown using API.
        =========================================== */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Filter by:
          </label>

          <select
            className="
              w-44
              rounded-md
              border
              border-gray-300
              bg-white
              px-3
              py-2
            "
          >
            <option>All Units</option>
          </select>
        </div>

        {/* ==========================================
            Document Type

            BACKEND TEAM:
            Populate from API.
        =========================================== */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            &nbsp;
          </label>

          <select
            className="
              w-44
              rounded-md
              border
              border-gray-300
              bg-white
              px-3
              py-2
            "
          >
            <option>All Document Types</option>
          </select>
        </div>

        {/* ==========================================
            Masterlist

            BACKEND TEAM:
            Download or open masterlist.
        =========================================== */}

        <button
          className="
            rounded-md
            bg-blue-900
            px-5
            py-2
            font-medium
            text-white
            transition
            hover:bg-blue-800
          "
        >
          Masterlist
        </button>

      </div>

    </div>
  );
}