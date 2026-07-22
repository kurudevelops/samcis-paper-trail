import { FileCheck2 } from "lucide-react";

export default function QualityHeader() {
  return (
    <div className="border-b border-gray-200 pb-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          <FileCheck2
            size={22}
            className="text-blue-900"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Quality Records
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View, upload, and manage quality record documents.
          </p>
        </div>
      </div>

      {/*
        BACKEND TEAM:

        User permissions should determine whether the current
        user may upload, edit, or delete quality records.

        Do not rely on hiding frontend buttons as security.
        The backend must verify every protected action.
      */}
    </div>
  );
}