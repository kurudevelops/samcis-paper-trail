import { useEffect, useMemo, useState } from "react";
import apiClient from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function UploadDocumentPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [term, setTerm] = useState("Prelim");
  const [file, setFile] = useState(null);
  const [windows, setWindows] = useState([]);
  const [selectedWindowId, setSelectedWindowId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [windowLoading, setWindowLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadWindows() {
      try {
        setWindowLoading(true);
        const response = await apiClient.get("/submission-windows/?academic_year=active");
        if (!cancelled) {
          setWindows(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.detail || "Failed to load submission windows.");
        }
      } finally {
        if (!cancelled) {
          setWindowLoading(false);
        }
      }
    }

    loadWindows();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeWindows = useMemo(
    () => windows.filter((window) => window.is_active),
    [windows]
  );

  const selectedWindow = useMemo(
    () => activeWindows.find((window) => window.id === selectedWindowId) || null,
    [activeWindows, selectedWindowId]
  );

  useEffect(() => {
    if (selectedWindow) {
      setTerm(selectedWindow.term);
    }
  }, [selectedWindow]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("term", term);
      formData.append("file", file);
      formData.append("window_id", selectedWindowId);

      const response = await apiClient.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(`Uploaded: ${response.data.document_code}`);
      setTitle("");
      setTerm("Prelim");
      setFile(null);
      setSelectedWindowId("");
      event.target.reset();
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const canUpload =
    user?.role === "faculty";

  if (!canUpload) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Submissions</h1>
        <p className="mt-2 text-sm text-gray-500">
          This page is for faculty uploads.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">Submissions</h1>
      <p className="mt-2 text-sm text-gray-500">
        Select an active submission window, then upload your document.
      </p>

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Active Submission Windows</h2>

        {windowLoading ? (
          <p className="mt-3 text-sm text-gray-500">Loading windows...</p>
        ) : (
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Year</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Term</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Start</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">End</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {activeWindows.map((window) => (
                  <tr
                    key={window.id}
                    className={selectedWindowId === window.id ? "bg-blue-50" : ""}
                  >
                    <td className="px-4 py-3 text-sm text-gray-800">{window.academic_year}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{window.term}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{window.doc_type_label}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{window.start_date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{window.end_date}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedWindowId(window.id)}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        {selectedWindowId === window.id ? "Selected" : "Use Window"}
                      </button>
                    </td>
                  </tr>
                ))}

                {!activeWindows.length && (
                  <tr>
                    <td className="px-4 py-6 text-sm text-gray-500" colSpan="5">
                      No active submission windows found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">
            Selected window:
            <span className="ml-2 font-semibold text-gray-800">
              {selectedWindow
                ? `${selectedWindow.academic_year} - ${selectedWindow.term}`
                : "None"}
            </span>
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Term
          </label>
          <select
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            required
          >
            <option value="Prelim">Prelim</option>
            <option value="Midterm">Midterm</option>
            <option value="Finals">Finals</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            File
          </label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="block w-full text-sm text-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !selectedWindow}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Submit Document"}
        </button>
      </form>
    </div>
  );
}