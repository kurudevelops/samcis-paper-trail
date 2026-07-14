// ======================================================
// EOMS Service
// ------------------------------------------------------
// Aruuu:
// This file acts as the bridge between the UI and backend.
//
// BACKEND TEAM:
// Replace the placeholder functions below with Axios
// requests to the FastAPI backend.
//
// Example:
//
// import axios from "axios";
//
// export async function getObjectives() {
//     const response = await axios.get("/api/objectives");
//     return response.data;
// }
//
// ======================================================

export async function getObjectives() {
  // =====================================================
  // FRONTEND PLACEHOLDER DATA
  //
  // BACKEND TEAM:
  // Replace the return value with the API response.
  // =====================================================

  return [
    {
      id: 1,
      frequency: "Annual",
      document: "Quality Objectives Monitoring",
      academicYear: "2024-2025",
      submissionDate: "2025-09-05 07:03:23",
    },
    {
      id: 2,
      frequency: "Annual",
      document: "Quality Objectives Monitoring",
      academicYear: "2023-2024",
      submissionDate: "2025-09-05 07:47:58",
    },
    {
      id: 3,
      frequency: "Semestral - First",
      document: "Midyear Performance Review",
      academicYear: "2024-2025",
      submissionDate: "2026-01-12 10:18:11",
    },
    {
      id: 4,
      frequency: "Semestral - Second",
      document: "Quality Objectives Monitoring",
      academicYear: "2022-2023",
      submissionDate: "2026-05-08 03:54:49",
    },
    {
      id: 5,
      frequency: "Semestral - Second",
      document: "Quality Objectives Monitoring",
      academicYear: "2021-2022",
      submissionDate: "2026-05-08 03:55:04",
    },
    {
      id: 6,
      frequency: "Annual",
      document: "Midyear Performance Review",
      academicYear: "2023-2024",
      submissionDate: "2026-05-12 02:05:36",
    },
    {
      id: 7,
      frequency: "Annual",
      document: "Quality Objectives Monitoring",
      academicYear: "2025-2026",
      submissionDate: "2026-03-16 02:04:46",
    },
    {
      id: 8,
      frequency: "Annual",
      document: "Midyear Performance Review",
      academicYear: "2025-2026",
      submissionDate: "2026-05-12 02:12:03",
    },
    {
      id: 9,
      frequency: "Quarterly",
      document: "Department Performance Evaluation",
      academicYear: "2024-2025",
      submissionDate: "2025-11-21 08:45:16",
    },
    {
      id: 10,
      frequency: "Monthly",
      document: "Facilities Inspection Report",
      academicYear: "2024-2025",
      submissionDate: "2025-10-08 01:20:43",
    }
  ];
}