export default function ControlledDocumentsToolbar({
  search = "",
  selectedUnit = "all",
  selectedDocumentType = "all",
  onSearchChange,
  onUnitChange,
  onDocumentTypeChange,
  onMasterlist,
}) {
  return (
    <div className="mb-6 rounded-lg border border-gray-300 bg-gray-50 p-5">
      <div className="flex flex-wrap items-end gap-4">
        {/* Search */}
        <div>
          <label
            htmlFor="controlled-document-search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search:
          </label>

          <input
            id="controlled-document-search"
            type="text"
            value={search}
            onChange={onSearchChange}
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
              transition
              focus:border-blue-700
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>

        {/* Unit filter */}
        <div>
          <label
            htmlFor="controlled-document-unit"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Filter by:
          </label>

          <select
            id="controlled-document-unit"
            value={selectedUnit}
            onChange={onUnitChange}
            className="
              w-44
              rounded-md
              border
              border-gray-300
              bg-white
              px-3
              py-2
              outline-none
              transition
              focus:border-blue-700
              focus:ring-2
              focus:ring-blue-100
            "
          >
            <option value="all">All Units</option>
            <option value="smi">SMI</option>
            <option value="registrar">Registrar</option>
            <option value="hr">HR Office</option>
          </select>
        </div>

        {/* Document type filter */}
        <div>
          <label
            htmlFor="controlled-document-type"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Document Type:
          </label>

          <select
            id="controlled-document-type"
            value={selectedDocumentType}
            onChange={onDocumentTypeChange}
            className="
              w-44
              rounded-md
              border
              border-gray-300
              bg-white
              px-3
              py-2
              outline-none
              transition
              focus:border-blue-700
              focus:ring-2
              focus:ring-blue-100
            "
          >
            <option value="all">All Document Types</option>
            <option value="manual">Manual</option>
            <option value="procedure">Procedure</option>
            <option value="form">Form</option>
            <option value="policy">Policy</option>
          </select>
        </div>

        {/* Masterlist button */}
        <button
          type="button"
          onClick={onMasterlist}
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

      {/*
        BACKEND TEAM:

        Replace the placeholder unit and document-type options
        with API data.

        Suggested endpoints:

        GET /api/units
        GET /api/document-types
        GET /api/controlled-documents/masterlist

        The search and filter values can be sent as query
        parameters when loading controlled documents.
      */}
    </div>
  );
}