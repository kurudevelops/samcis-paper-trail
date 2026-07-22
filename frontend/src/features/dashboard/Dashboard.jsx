import { useEffect, useState } from "react";
import apiClient from "../../api/client";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        const response = await apiClient.get("/analytics/dashboard");
        if (!cancelled) {
          setStats(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.detail || "Failed to load dashboard.");
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-sm text-gray-500">Analytics snapshot</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-gray-100 p-4 text-center">
          <div className="text-sm text-gray-500">Total Docs</div>
          <div className="text-2xl font-bold text-gray-800">{stats?.total_documents ?? "..."}</div>
        </div>
        <div className="rounded-lg bg-gray-100 p-4 text-center">
          <div className="text-sm text-gray-500">Users</div>
          <div className="text-2xl font-bold text-gray-800">{stats?.total_users ?? "..."}</div>
        </div>
        <div className="rounded-lg bg-gray-100 p-4 text-center">
          <div className="text-sm text-gray-500">Submission Windows</div>
          <div className="text-2xl font-bold text-gray-800">{stats?.active_submission_windows ?? "..."}</div>
        </div>
        <div className="rounded-lg bg-gray-100 p-4 text-center">
          <div className="text-sm text-gray-500">Status Buckets</div>
          <div className="text-2xl font-bold text-gray-800">{stats?.documents_by_status?.length ?? "..."}</div>
        </div>
      </div>
    </div>
  );
}
