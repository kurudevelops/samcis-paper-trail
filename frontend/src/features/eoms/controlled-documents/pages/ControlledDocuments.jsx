import { useEffect, useState } from "react";

import ControlledDocumentsHeader from "../components/ControlledDocumentsHeader";
import ControlledDocumentsToolbar from "../components/ControlledDocumentsToolbar";
import ControlledDocumentsTable from "../components/ControlledDocumentsTable";

import {
  getControlledDocuments,
} from "../services/controlledDocumentsService";

export default function ControlledDocuments() {
  const [documents, setDocuments] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [selectedDocumentType, setSelectedDocumentType] =
    useState("all");

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadDocuments() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const filters = {
          search,
          unit: selectedUnit,
          documentType: selectedDocumentType,
        };

        const data = await getControlledDocuments(filters);

        setDocuments(data);
      } catch (error) {
        console.error(
          "Failed to load controlled documents:",
          error
        );

        setDocuments([]);
        setErrorMessage(
          "Unable to load controlled documents."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadDocuments();
  }, [
    search,
    selectedUnit,
    selectedDocumentType,
  ]);

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  function handleUnitChange(event) {
    setSelectedUnit(event.target.value);
  }

  function handleDocumentTypeChange(event) {
    setSelectedDocumentType(event.target.value);
  }

  function handleNewDocument() {
    // FRONTEND PLACEHOLDER:
    // Open the controlled-document creation form or modal.
    console.log("Create controlled document");
  }

  function handleMasterlist() {
    // BACKEND TEAM:
    // Replace with the masterlist download endpoint.
    console.log("Download controlled documents masterlist");
  }

  function handleView(document) {
    // FRONTEND PLACEHOLDER:
    // Open the selected document or navigate to its details page.
    console.log("View controlled document:", document);
  }

  function handleDownload(document) {
    // BACKEND TEAM:
    // Replace with:
    // GET /api/controlled-documents/{id}/download
    console.log("Download controlled document:", document);
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      <ControlledDocumentsHeader
        onNewDocument={handleNewDocument}
      />

      <ControlledDocumentsToolbar
        search={search}
        selectedUnit={selectedUnit}
        selectedDocumentType={selectedDocumentType}
        onSearchChange={handleSearchChange}
        onUnitChange={handleUnitChange}
        onDocumentTypeChange={
          handleDocumentTypeChange
        }
        onMasterlist={handleMasterlist}
      />

      {errorMessage && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-lg border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Loading controlled documents...
        </div>
      ) : (
        <ControlledDocumentsTable
          rows={documents}
          onView={handleView}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}