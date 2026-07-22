import { useEffect, useState } from "react";
import apiClient from "../../api/client";

export default function RepositoryPage() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDocuments() {
      try {
        const response = await apiClient.get("/documents");
        if (!cancelled) {
          setDocuments(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.detail || "Failed to load documents.");
        }
      }
    }

    loadDocuments();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDownload = async (documentId) => {
    try {
      setDownloadingId(documentId);
      const response = await apiClient.get(`/documents/${documentId}/download`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "document";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.detail || "Download failed.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">Repository</h1>
      <p className="text-sm text-gray-500">Documents visible to your role</p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Code</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Revision</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td className="px-4 py-3 text-sm text-gray-800">{doc.document_code}</td>
                <td className="px-4 py-3 text-sm text-gray-800">{doc.title}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{doc.status?.value ?? doc.status}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{doc.current_revision}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleDownload(doc.id)}
                    disabled={downloadingId === doc.id}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {downloadingId === doc.id ? "Downloading..." : "Download"}
                  </button>
                </td>
              </tr>
            ))}
            {!documents.length && !error && (
              <tr>
                <td className="px-4 py-6 text-sm text-gray-500" colSpan="5">
                  No documents available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}