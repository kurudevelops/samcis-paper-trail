// ======================================================
// Planning Documents Service
// ------------------------------------------------------
// FRONTEND TEAM:
//
// This file provides temporary placeholder data for the
// Planning Documents page until the backend is connected.
//
// BACKEND TEAM:
//
// Replace getPlanningDocuments() with an Axios request.
//
// Example:
//
// import axios from "axios";
//
// export async function getPlanningDocuments(filters = {}) {
//   const response = await axios.get(
//     "/api/planning-documents",
//     {
//       params: filters,
//     }
//   );
//
//   return response.data;
// }
//
// ======================================================

const planningDocuments = [
  {
    id: 1,
    planning: "Annual Operational Plan",
    planningType: "Annual",
    academicYear: "2025-2026",
    submissionDate: "2026-07-01 08:30:00",
  },
  {
    id: 2,
    planning: "College Strategic Plan",
    planningType: "Strategic",
    academicYear: "2025-2026",
    submissionDate: "2026-07-03 09:15:00",
  },
  {
    id: 3,
    planning: "Extension Program Plan",
    planningType: "Extension",
    academicYear: "2024-2025",
    submissionDate: "2026-06-28 14:00:00",
  },
  {
    id: 4,
    planning: "Research Development Plan",
    planningType: "Research",
    academicYear: "2025-2026",
    submissionDate: "2026-07-05 10:45:00",
  },
  {
    id: 5,
    planning: "Facilities Improvement Plan",
    planningType: "Infrastructure",
    academicYear: "2024-2025",
    submissionDate: "2026-06-20 13:10:00",
  },
  {
    id: 6,
    planning: "Student Affairs Plan",
    planningType: "Student Services",
    academicYear: "2025-2026",
    submissionDate: "2026-07-08 11:20:00",
  },
];

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getPlanningDocuments(filters = {}) {
  await delay();

  const {
    search = "",
    planningType = "all",
    fromYear = "",
    toYear = "",
  } = filters;

  const keyword = search.trim().toLowerCase();

  return planningDocuments.filter((document) => {
    const matchesSearch =
      keyword === "" ||
      document.planning.toLowerCase().includes(keyword);

    const matchesPlanningType =
      planningType === "all" ||
      document.planningType === planningType;

    const matchesFrom =
      fromYear === "" ||
      document.academicYear >= fromYear;

    const matchesTo =
      toYear === "" ||
      document.academicYear <= toYear;

    return (
      matchesSearch &&
      matchesPlanningType &&
      matchesFrom &&
      matchesTo
    );
  });
}

/*
======================================================

BACKEND TEAM

Replace this file with Axios.

Suggested endpoint:

GET /api/planning-documents

Supported query parameters:

search
planningType
fromYear
toYear

Response example:

[
  {
    id,
    planning,
    planningType,
    academicYear,
    submissionDate
  }
]

======================================================
*/