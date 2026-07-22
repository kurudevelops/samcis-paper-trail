import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import apiClient from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function SubmissionWindowsPage() {
  const { user } = useAuth();
  const [windows, setWindows] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [windowLoading, setWindowLoading] = useState(false);

  const [form, setForm] = useState({
    academic_year: "2026-2027",
    term: "Prelim",
    start_date: "",
    end_date: "",
    is_active: true,
  });

  const canAccess =
    user?.role === "dean" || user?.role === "administrator";

  useEffect(() => {
    let cancelled = false;

    async function loadWindows() {
      try {
        setWindowLoading(true);
        const response = await apiClient.get("/submission-windows/");
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

    if (canAccess) {
      loadWindows();
    }

    return () => {
      cancelled = true;
    };
  }, [canAccess]);

  if (!canAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await apiClient.post("/submission-windows/", {
        ...form,
        is_active: true,
      });

      setMessage("Submission window created successfully.");
      setWindows((previous) => [response.data, ...previous]);
      setForm({
        academic_year: "2026-2027",
        term: "Prelim",
        start_date: "",
        end_date: "",
        is_active: true,
      });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create submission window.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">Submission Windows</h1>
      <p className="mt-2 text-sm text-gray-500">
        Dean-managed windows for document submissions.
      </p>

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-lg border border-gray-200 p-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-700">Academic Year</label>
          <input
            name="academic_year"
            value={form.academic_year}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-700">Term</label>
          <select
            name="term"
            value={form.term}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="Prelim">Prelim</option>
            <option value="Midterm">Midterm</option>
            <option value="Finals">Finals</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="datetime-local"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-700">End Date</label>
          <input
            type="datetime-local"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Submission Window"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800">Existing Windows</h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Year</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Term</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Start</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">End</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {windowLoading ? (
                <tr>
                  <td className="px-4 py-6 text-sm text-gray-500" colSpan="5">
                    Loading submission windows...
                  </td>
                </tr>
              ) : windows.length ? (
                windows.map((window) => (
                  <tr key={window.id}>
                    <td className="px-4 py-3 text-sm text-gray-800">{window.academic_year}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{window.term}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{window.start_date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{window.end_date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{window.is_active ? "Yes" : "No"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-6 text-sm text-gray-500" colSpan="5">
                    No submission windows found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}