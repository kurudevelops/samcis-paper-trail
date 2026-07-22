import { useState } from "react";
import { X, Upload } from "lucide-react";

export default function UploadModal({
  isOpen = false,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    qrCode: "",
    asOfDate: "",
    title: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  if (!isOpen) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleFileChange(event) {
    setSelectedFile(
      event.target.files?.[0] ?? null
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit?.({
      ...formData,
      file: selectedFile,
    });

    setFormData({
      qrCode: "",
      asOfDate: "",
      title: "",
    });

    setSelectedFile(null);

    onClose?.();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-xl rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

          <h2 className="text-xl font-bold text-gray-800">
            Upload Quality Record
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* QR Code */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              QR Code
            </label>

            <input
              type="text"
              name="qrCode"
              value={formData.qrCode}
              onChange={handleChange}
              placeholder="QR-SMI-001"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
              required
            />
          </div>

          {/* As of Date */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              As of Date
            </label>

            <input
              type="date"
              name="asOfDate"
              value={formData.asOfDate}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
              required
            />
          </div>

          {/* Title */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Minutes of the Meeting"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
              required
            />
          </div>

          {/* File */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Upload File
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx,.xlsx,.xls"
              onChange={handleFileChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />

            <p className="mt-2 text-xs text-gray-500">
              Accepted formats:
              PDF, DOC, DOCX, XLS, XLSX
            </p>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-5 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-md bg-blue-900 px-5 py-2 font-medium text-white transition hover:bg-blue-800"
            >
              <Upload size={17} />

              Upload
            </button>

          </div>

        </form>

      </div>

      {/*
      =======================================================

      BACKEND TEAM

      Replace the submit handler with an API request.

      Example:

      const form = new FormData();

      form.append("qrCode", formData.qrCode);
      form.append("title", formData.title);
      form.append("asOfDate", formData.asOfDate);
      form.append("file", selectedFile);

      axios.post("/api/quality-records", form);

      The backend should:

      • Validate the uploaded file.
      • Store the document.
      • Save metadata.
      • Return the newly created Quality Record.

      =======================================================
      */}

    </div>
  );
}