// ======================================================
// Planning Documents Service
// ------------------------------------------------------
// FRONTEND TEAM:
//
// This file acts as the bridge between the React UI
// and the FastAPI backend.
//
// BACKEND TEAM:
//
// Replace the placeholder function below with an
// Axios request.
//
// Example:
//
// import axios from "axios";
//
// export async function getPlanningDocuments() {
//     const response = await axios.get("/api/planning-documents");
//     return response.data;
// }
//
// ======================================================

export async function getPlanningDocuments() {

  // Placeholder data until backend integration.

  return [

    {
      id: 1,
      documentCode: "GL-SMI-013",
      title: "HTM Laboratory Guidelines",
      type: "Guidelines",
      revision: 1,
      effectivity: "2026-07-01",
    },

    {
      id: 2,
      documentCode: "PM-UNL-002",
      title: "Reader Services",
      type: "Procedure",
      revision: 0,
      effectivity: "2026-06-30",
    },

    {
      id: 3,
      documentCode: "FM-CMS-018",
      title: "CCTV Report and Releasing Form",
      type: "Form",
      revision: 1,
      effectivity: "2026-07-01",
    },

    {
      id: 4,
      documentCode: "GL-SOL-010",
      title: "Law Student Year-Level Classification",
      type: "Guidelines",
      revision: 0,
      effectivity: "2026-07-06",
    },

    {
      id: 5,
      documentCode: "WI-UNL-005",
      title: "Curricular Mapping",
      type: "Work Instruction",
      revision: 0,
      effectivity: "2026-06-30",
    },

    {
      id: 6,
      documentCode: "WI-UNL-004",
      title: "Book Pick-up Service During Unforeseeable Events",
      type: "Work Instruction",
      revision: 0,
      effectivity: "2026-06-30",
    },

    {
      id: 7,
      documentCode: "WI-UNL-003",
      title: "Online Document Delivery Service During Unforeseeable Events",
      type: "Work Instruction",
      revision: 0,
      effectivity: "2026-06-30",
    },

    {
      id: 8,
      documentCode: "WI-UNL-002",
      title: "Library Orientation During Unforeseeable Events",
      type: "Work Instruction",
      revision: 0,
      effectivity: "2026-06-30",
    },

    {
      id: 9,
      documentCode: "WI-UNL-001",
      title: "Recommending Library Materials for Acquisition",
      type: "Work Instruction",
      revision: 0,
      effectivity: "2026-06-30",
    },

    {
      id: 10,
      documentCode: "GL-SOL-011",
      title: "General Guidelines in the Grading of the Three (3) Capstone Papers",
      type: "Guidelines",
      revision: 0,
      effectivity: "2026-07-02",
    },

    {
      id: 11,
      documentCode: "PM-DPO-003",
      title: "Data Breach Management",
      type: "Procedure Manual",
      revision: 2,
      effectivity: "2026-08-15",
    },

    {
      id: 12,
      documentCode: "PM-DPO-002",
      title: "Privacy Impact Assessment",
      type: "Procedure Manual",
      revision: 2,
      effectivity: "2026-08-15",
    },

    {
      id: 13,
      documentCode: "PM-DPO-001",
      title: "Data Privacy & Security Policy Implementation",
      type: "Procedure Manual",
      revision: 2,
      effectivity: "2026-08-15",
    },

    {
      id: 14,
      documentCode: "PM-DPO-004",
      title: "Training Program",
      type: "Procedure Manual",
      revision: 2,
      effectivity: "2026-08-15",
    },

  ];
}