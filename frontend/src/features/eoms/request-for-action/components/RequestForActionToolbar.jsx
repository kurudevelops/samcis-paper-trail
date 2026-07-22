export default function RequestForActionToolbar({
  search = "",
  fromDate = "",
  toDate = "",
  onSearchChange,
  onFromDateChange,
  onToDateChange,
}) {
  return (
    <div className="mb-6 rounded-lg border border-gray-300 bg-gray-50 p-5">
      <div className="flex flex-wrap items-end gap-4">
        {/* Search */}
        <div>
          <label
            htmlFor="request-for-action-search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search:
          </label>

          <input
            id="request-for-action-search"
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Search Request for Action..."
            className="
              w-64
              rounded-md
              border
              border-gray-300
              bg-white
              px-3
              py-2
              text-sm
              outline-none
              transition
              focus:border-blue-700
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>

        {/* From date */}
        <div>
          <label
            htmlFor="request-for-action-from-date"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            From:
          </label>

          <input
            id="request-for-action-from-date"
            type="date"
            value={fromDate}
            onChange={onFromDateChange}
            className="
              w-44
              rounded-md
              border
              border-gray-300
              bg-white
              px-3
              py-2
              text-sm
              outline-none
              transition
              focus:border-blue-700
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>

        {/* To date */}
        <div>
          <label
            htmlFor="request-for-action-to-date"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            To:
          </label>

          <input
            id="request-for-action-to-date"
            type="date"
            value={toDate}
            onChange={onToDateChange}
            className="
              w-44
              rounded-md
              border
              border-gray-300
              bg-white
              px-3
              py-2
              text-sm
              outline-none
              transition
              focus:border-blue-700
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>
      </div>

      {/*
        BACKEND TEAM:

        Send these values as query parameters:

        GET /api/request-for-actions
          ?search=
          &fromDate=
          &toDate=
      */}
    </div>
  );
}