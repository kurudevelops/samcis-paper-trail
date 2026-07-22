// src/features/admin/CreateSubmissionWindow.jsx
import { useEffect, useState } from "react";
import apiClient from "../../api/client";

export default function CreateSubmissionWindow() {
  const [types, setTypes] = useState([]);
  const [docTypeId, setDocTypeId] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [term, setTerm] = useState("Prelim");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient.get("/documents/types").then((res) => setTypes(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await apiClient.post("/submission-windows/", {
        doc_type_id: docTypeId,
        academic_year: academicYear,
        term,
        start_date: startDate,
        end_date: endDate,
        is_active: true,
      });
      setMessage(`Window created for ${res.data.doc_type_label} — ${res.data.term}`);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create window.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-xl font-bold">Create Submission Window</h1>
      {message && <p className="text-green-600 text-sm">{message}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Document Type</label>
        <select value={docTypeId} onChange={(e) => setDocTypeId(e.target.value)} required
          className="w-full rounded-lg border px-3 py-2 text-sm">
          <option value="">Select type...</option>
          {types.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Academic Year</label>
        <input value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}
          placeholder="2026-2027" required className="w-full rounded-lg border px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Term</label>
        <select value={term} onChange={(e) => setTerm(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 text-sm">
          <option value="Prelim">Prelim</option>
          <option value="Midterm">Midterm</option>
          <option value="Finals">Finals</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)}
          required className="w-full rounded-lg border px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">End Date</label>
        <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)}
          required className="w-full rounded-lg border px-3 py-2 text-sm" />
      </div>

      <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
        Create Window
      </button>
    </form>
  );
}