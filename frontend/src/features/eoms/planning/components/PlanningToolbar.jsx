export default function PlanningToolbar({
  search = "",
  planningType = "all",
  fromYear = "",
  toYear = "",
  planningTypes = [],
  academicYears = [],
  onSearchChange,
  onPlanningTypeChange,
  onFromYearChange,
  onToYearChange,
}) {
  return (
    <div className="mb-6 rounded-lg border border-gray-300 bg-gray-50 p-5">
      <div className="flex flex-wrap items-end gap-4">
        {/* ==========================================
            Search
        ========================================== */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Search:
          </label>

          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Search planning..."
            className="
              w-64
              rounded-md
              border
              border-gray-300
              bg-white
              px-3
              py-2
              outline-none
              transition
              focus:border-blue-700
            "
          />
        </div>

        {/* ==========================================
            Planning Type

            BACKEND TEAM:
            Populate options from the API.
        ========================================== */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            &nbsp;
          </label>

          <select
            value={planningType}
            onChange={onPlanningTypeChange}
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
            <option value="all">
              All Planning Types
            </option>

            {planningTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* ==========================================
            Academic Year From
        ========================================== */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            &nbsp;
          </label>

          <select
            value={fromYear}
            onChange={onFromYearChange}
            className="
              w-40
              rounded-md
              border
              border-gray-300
              bg-white
              px-3
              py-2
            "
          >
            <option value="">From</option>

            {academicYears.map((year) => (
              <option
                key={year}
                value={year}
              >
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* ==========================================
            Academic Year To
        ========================================== */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            &nbsp;
          </label>

          <select
            value={toYear}
            onChange={onToYearChange}
            className="
              w-40
              rounded-md
              border
              border-gray-300
              bg-white
              px-3
              py-2
            "
          >
            <option value="">To</option>

            {academicYears.map((year) => (
              <option
                key={year}
                value={year}
              >
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/*
        ======================================================

        BACKEND TEAM

        Replace these values with API data.

        planningTypes:
        GET /api/planning/types

        academicYears:
        GET /api/academic-years

        Search and filters should be sent to the planning
        endpoint as query parameters.

        ======================================================
      */}
    </div>
  );
}