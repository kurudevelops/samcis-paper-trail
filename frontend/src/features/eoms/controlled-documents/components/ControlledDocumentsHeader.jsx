export default function ControlledDocumentsHeader({
  onNewDocument,
}) {
  return (
    <div className="mb-8 flex items-start justify-between">
      {/* ==========================================
          PAGE TITLE
      ========================================== */}
      <div>
        <h1 className="text-5xl font-bold text-slate-900">
          List of Documents
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage controlled documents.
        </p>
      </div>

      {/* ==========================================
          NEW DOCUMENT

          BACKEND TEAM

          Open the Create Controlled Document
          page or upload modal.

          The backend must verify the user's
          permission before allowing document
          creation.
      ========================================== */}

      <button
        type="button"
        onClick={onNewDocument}
        className="
          rounded-lg
          bg-blue-900
          px-6
          py-3
          font-semibold
          text-white
          shadow
          transition
          hover:bg-blue-800
        "
      >
        + New
      </button>
    </div>
  );
}