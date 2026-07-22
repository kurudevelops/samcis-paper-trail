import { RefreshCw, Search, Upload } from "lucide-react";

export default function QualityToolbar({
  search = "",
  onSearchChange,
  onUpload,
  onRefresh,
  isLoading = false,
}) {
  return (
    <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
      {/* Search field */}
      <div className="w-full max-w-md">
        <label
          htmlFor="quality-record-search"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Search:
        </label>

        <div className="relative">
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="quality-record-search"
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Search by QR code or document title"
            className="
              w-full
              rounded-md
              border
              border-gray-300
              bg-white
              py-2
              pl-10
              pr-3
              text-sm
              text-gray-700
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-blue-700
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>
      </div>

      {/* Toolbar buttons */}
      <div className="flex items-center gap-2">
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

        <button
          type="button"
          onClick={onUpload}
          className="
            inline-flex
            items-center
            gap-2
            rounded-md
            bg-blue-900
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-800
          "
        >
          <Upload size={16} />
          Upload
        </button>
      </div>

      {/*
        BACKEND TEAM:

        Search can later be sent as a query parameter.

        Example:
        GET /api/quality-records?search=QR-SMI-001

        Upload visibility should depend on the authenticated
        user's permissions, but the backend must still verify
        authorization when the request is submitted.
      */}
    </div>
  );
}