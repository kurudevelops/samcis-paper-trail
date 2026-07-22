// src/components/ActiveYearBadge.jsx
import { useEffect, useState } from "react";
import apiClient from "../api/client";

export default function ActiveYearBadge({ className }) {
  const [year, setYear] = useState(null);
  useEffect(() => {
    apiClient.get("/academic-years/active")
      .then((res) => setYear(res.data.label))
      .catch(() => setYear(null));
  }, []);
  if (!year) return null;
  return (
    <span className={className || "rounded-full bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1"}>
      AY {year}
    </span>
  );
}