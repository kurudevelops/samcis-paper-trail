export default function ObjectiveToolbar() {
  return (
    <div className="mb-6 rounded-md border border-gray-300 bg-gray-50 p-4">

      {/* =======================================================
          FILTERS

          BACKEND TEAM:

          Connect each filter to the API.

          Search
          QOM Type
          From Academic Year
          To Academic Year

      ======================================================== */}

      <div className="flex flex-wrap items-center gap-6">

        {/* Search */}

        <div className="flex items-center gap-2">

          <label className="font-medium text-gray-700">
            Search
          </label>

          <input
            type="text"
            className="w-60 rounded border border-gray-400 px-3 py-2 focus:border-blue-700 focus:outline-none"
            placeholder="Search..."
          />

        </div>

        {/* QOM Type */}

        <div className="flex items-center gap-2">

          <label className="font-medium text-gray-700">
            QOM Type
          </label>

          <select className="rounded border border-gray-400 px-3 py-2">

            {/* BACKEND TEAM */}

            <option>All</option>

          </select>

        </div>

        {/* From */}

        <div className="flex items-center gap-2">

          <label className="font-medium text-gray-700">
            From
          </label>

          <select className="rounded border border-gray-400 px-3 py-2">

            {/* BACKEND TEAM */}

            <option>--</option>

          </select>

        </div>

        {/* To */}

        <div className="flex items-center gap-2">

          <label className="font-medium text-gray-700">
            To
          </label>

          <select className="rounded border border-gray-400 px-3 py-2">

            {/* BACKEND TEAM */}

            <option>--</option>

          </select>

        </div>

      </div>

    </div>
  );
}