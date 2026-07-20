// ======================================================
// Controlled Documents Service
// ------------------------------------------------------
// FRONTEND TEAM:
//
// This file provides temporary placeholder data so the
// Controlled Documents page can render before the backend
// is connected.
//
// BACKEND TEAM:
//
// Replace getControlledDocuments() with an Axios request.
//
// Example:
//
// import axios from "axios";
//
// export async function getControlledDocuments(filters = {}) {
//   const response = await axios.get(
//     "/api/controlled-documents",
//     { params: filters }
//   );
//
//   return response.data;
// }
//
// ======================================================

const controlledDocuments = [
  {
    id: 1,
    documentCode: "GL-SMI-013",
    title: "HTM Laboratory Guidelines",
    type: "Guidelines",
    revision: 1,
    effectivity: "2026-07-01",
    unit: "smi",
  },
  {
    id: 2,
    documentCode: "PM-UNL-002",
    title: "Reader Services",
    type: "Procedure",
    revision: 0,
    effectivity: "2026-06-30",
    unit: "unl",
  },
  {
    id: 3,
    documentCode: "FM-CMS-018",
    title: "CCTV Report and Releasing Form",
    type: "Form",
    revision: 1,
    effectivity: "2026-07-01",
    unit: "cms",
  },
  {
    id: 4,
    documentCode: "GL-SOL-010",
    title: "Law Student Year-Level Classification",
    type: "Guidelines",
    revision: 0,
    effectivity: "2026-07-06",
    unit: "sol",
  },
  {
    id: 5,
    documentCode: "WI-UNL-005",
    title: "Curricular Mapping",
    type: "Work Instruction",
    revision: 0,
    effectivity: "2026-06-30",
    unit: "unl",
  },
  {
    id: 6,
    documentCode: "WI-UNL-004",
    title: "Book Pick-up Service During Unforeseeable Events",
    type: "Work Instruction",
    revision: 0,
    effectivity: "2026-06-30",
    unit: "unl",
  },
  {
    id: 7,
    documentCode: "WI-UNL-003",
    title: "Online Document Delivery Service During Unforeseeable Events",
    type: "Work Instruction",
    revision: 0,
    effectivity: "2026-06-30",
    unit: "unl",
  },
  {
    id: 8,
    documentCode: "WI-UNL-002",
    title: "Library Orientation During Unforeseeable Events",
    type: "Work Instruction",
    revision: 0,
    effectivity: "2026-06-30",
    unit: "unl",
  },
  {
    id: 9,
    documentCode: "WI-UNL-001",
    title: "Recommending Library Materials for Acquisition",
    type: "Work Instruction",
    revision: 0,
    effectivity: "2026-06-30",
    unit: "unl",
  },
  {
    id: 10,
    documentCode: "GL-SOL-011",
    title:
      "General Guidelines in the Grading of the Three (3) Capstone Papers",
    type: "Guidelines",
    revision: 0,
    effectivity: "2026-07-02",
    unit: "sol",
  },
  {
    id: 11,
    documentCode: "PM-DPO-003",
    title: "Data Breach Management",
    type: "Procedure Manual",
    revision: 2,
    effectivity: "2026-08-15",
    unit: "dpo",
  },
  {
    id: 12,
    documentCode: "PM-DPO-002",
    title: "Privacy Impact Assessment",
    type: "Procedure Manual",
    revision: 2,
    effectivity: "2026-08-15",
    unit: "dpo",
  },
  {
    id: 13,
    documentCode: "PM-DPO-001",
    title: "Data Privacy & Security Policy Implementation",
    type: "Procedure Manual",
    revision: 2,
    effectivity: "2026-08-15",
    unit: "dpo",
  },
  {
    id: 14,
    documentCode: "PM-DPO-004",
    title: "Training Program",
    type: "Procedure Manual",
    revision: 2,
    effectivity: "2026-08-15",
    unit: "dpo",
  },
];

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getControlledDocuments(filters = {}) {
  await delay();

  const {
    search = "",
    unit = "all",
    documentType = "all",
  } = filters;

  const keyword = search.trim().toLowerCase();

  return controlledDocuments.filter((document) => {
    const matchesSearch =
      !keyword ||
      document.documentCode.toLowerCase().includes(keyword) ||
      document.title.toLowerCase().includes(keyword);

    const matchesUnit =
      unit === "all" || document.unit === unit;

    const matchesDocumentType =
      documentType === "all" ||
      document.type.toLowerCase() ===
        documentType.toLowerCase();

    return (
      matchesSearch &&
      matchesUnit &&
      matchesDocumentType
    );
  });
}