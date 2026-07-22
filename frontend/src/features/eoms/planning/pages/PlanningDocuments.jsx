import { useEffect, useState } from "react";

import PlanningHeader from "../components/PlanningHeader";
import PlanningToolbar from "../components/PlanningToolbar";
import PlanningTable from "../components/PlanningTable";

import {
  getPlanningDocuments,
} from "../services/planningService";

export default function PlanningDocuments() {
  const [documents, setDocuments] = useState([]);

  const [search, setSearch] = useState("");
  const [planningType, setPlanningType] =
    useState("all");
  const [fromYear, setFromYear] =
    useState("");
  const [toYear, setToYear] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(true);
  const [errorMessage, setErrorMessage] =
    useState("");

  // ==========================================
  // Placeholder values.
  //
  // BACKEND TEAM:
  // Load these from the API.
  // ==========================================

  const planningTypes = [
    "Annual",
    "Strategic",
    "Research",
    "Extension",
    "Infrastructure",
    "Student Services",
  ];

  const academicYears = [
    "2022-2023",
    "2023-2024",
    "2024-2025",
    "2025-2026",
    "2026-2027",
  ];

  useEffect(() => {
    async function loadPlanningDocuments() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const filters = {
          search,
          planningType,
          fromYear,
          toYear,
        };

        const data =
          await getPlanningDocuments(filters);

        setDocuments(data);
      } catch (error) {
        console.error(
          "Failed to load planning documents:",
          error
        );

        setDocuments([]);
        setErrorMessage(
          "Unable to load planning documents."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadPlanningDocuments();
  }, [
    search,
    planningType,
    fromYear,
    toYear,
  ]);

  function handleNewPlanningDocument() {
    // ==========================================
    // FRONTEND PLACEHOLDER
    //
    // BACKEND TEAM:
    // Open Create Planning Document page
    // or modal.
    // ==========================================
    console.log("Create Planning Document");
  }

  function handleView(document) {
    console.log("View", document);
  }

  function handleEdit(document) {
    console.log("Edit", document);
  }

  function handleDelete(document) {
    console.log("Delete", document);
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      <PlanningHeader
        onNewPlanningDocument={
          handleNewPlanningDocument
        }
      />

      <PlanningToolbar
        search={search}
        planningType={planningType}
        fromYear={fromYear}
        toYear={toYear}
        planningTypes={planningTypes}
        academicYears={academicYears}
        onSearchChange={(event) =>
          setSearch(event.target.value)
        }
        onPlanningTypeChange={(event) =>
          setPlanningType(event.target.value)
        }
        onFromYearChange={(event) =>
          setFromYear(event.target.value)
        }
        onToYearChange={(event) =>
          setToYear(event.target.value)
        }
      />

      {errorMessage && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-lg border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Loading planning documents...
        </div>
      ) : (
        <PlanningTable
          rows={documents}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/*
      ======================================================

      BACKEND TEAM

      Replace the placeholder values with API calls.

      GET /api/planning-document-types
      GET /api/academic-years
      GET /api/planning-documents

      The authenticated user should only receive
      planning documents they are authorized to
      access.

      ======================================================
      */}
    </div>
  );
}