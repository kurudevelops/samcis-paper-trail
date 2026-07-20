// ======================================================
// Request for Action Service
// ------------------------------------------------------
// FRONTEND TEAM:
//
// This file provides temporary placeholder data so the
// Request for Action page can render before the backend
// is connected.
//
// BACKEND TEAM:
//
// Replace getRequestForActions() with an Axios request.
//
// Example:
//
// import axios from "axios";
//
// export async function getRequestForActions(filters = {}) {
//   const response = await axios.get(
//     "/api/request-for-actions",
//     {
//       params: filters,
//     }
//   );
//
//   return response.data;
// }
//
// ======================================================

const requestForActionRecords = [
  {
    id: 1,
    referenceNo: "RA-SMI-2026-004",
    raType: "Minor NC",
    issueDate: "2026-06-19",
    issuedBy: "Lovely Sharae Mejia",
    status: "For Review",
  },
  {
    id: 2,
    referenceNo: "RA-SMI-2026-003",
    raType: "Observation",
    issueDate: "2026-06-15",
    issuedBy: "Quality Assurance Office",
    status: "In Progress",
  },
  {
    id: 3,
    referenceNo: "RA-SMI-2026-002",
    raType: "Major NC",
    issueDate: "2026-06-10",
    issuedBy: "Internal Audit Team",
    status: "Open",
  },
  {
    id: 4,
    referenceNo: "RA-SMI-2026-001",
    raType: "Opportunity for Improvement",
    issueDate: "2026-06-05",
    issuedBy: "Management Review Committee",
    status: "Closed",
  },
];

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getRequestForActions(filters = {}) {
  await delay();

  const {
    search = "",
    fromDate = "",
    toDate = "",
  } = filters;

  const keyword = search.trim().toLowerCase();

  return requestForActionRecords.filter((record) => {
    const matchesSearch =
      keyword === "" ||
      record.referenceNo.toLowerCase().includes(keyword) ||
      record.raType.toLowerCase().includes(keyword) ||
      record.issuedBy.toLowerCase().includes(keyword) ||
      record.status.toLowerCase().includes(keyword);

    const matchesFromDate =
      fromDate === "" ||
      record.issueDate >= fromDate;

    const matchesToDate =
      toDate === "" ||
      record.issueDate <= toDate;

    return (
      matchesSearch &&
      matchesFromDate &&
      matchesToDate
    );
  });
}

/*
======================================================

BACKEND TEAM

Suggested endpoint:

GET /api/request-for-actions

Supported query parameters:

search
fromDate
toDate

Expected response:

[
  {
    id,
    referenceNo,
    raType,
    issueDate,
    issuedBy,
    status
  }
]

The backend must return only records the authenticated
user is authorized to view.

======================================================
*/