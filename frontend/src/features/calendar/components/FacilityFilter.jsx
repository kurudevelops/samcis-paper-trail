import { RefreshCw } from "lucide-react";

export default function FacilityFilter({
  facilities = [],
  selectedFacility = "all",
  onFacilityChange,
  onRefresh,
  isLoading = false,
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-wrap items-end gap-4">
        {/* Facility filter */}
        <div>
          <label
            htmlFor="calendar-facility"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Facility:
          </label>

          <select
            id="calendar-facility"
            value={selectedFacility}
            onChange={onFacilityChange}
            className="
              min-w-72
              rounded-md
              border
              border-gray-300
              bg-white
              px-3
              py-2
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-blue-700
              focus:ring-2
              focus:ring-blue-100
            "
          >
            {facilities.length === 0 ? (
              <option value="all">
                Loading facilities...
              </option>
            ) : (
              facilities.map((facility) => (
                <option
                  key={facility.id}
                  value={facility.id}
                >
                  {facility.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Backend integration note */}
        <div className="max-w-md text-xs leading-5 text-gray-500">
          {/* 
            BACKEND TEAM:

            Facility options should come from an API.

            The backend may return only facilities visible
            or available to the authenticated user.

            The selected facility ID is passed to the
            calendar-event request as a filter.
          */}
          Select a facility to view its reservations and scheduled events.
        </div>
      </div>

      {/* Refresh control */}
      <button
        type="button"
        onClick={onRefresh}
        disabled={isLoading}
        className="
          inline-flex
          items-center
          gap-2
          rounded-md
          border
          border-gray-300
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          text-gray-700
          transition
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <RefreshCw
          size={16}
          className={isLoading ? "animate-spin" : ""}
        />

        Refresh
      </button>
    </div>
  );
}