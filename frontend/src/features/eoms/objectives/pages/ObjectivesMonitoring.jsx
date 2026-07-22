import { useEffect, useState } from "react";

import ObjectiveHeader from "../components/ObjectiveHeader";
import ObjectiveToolbar from "../components/ObjectiveToolbar";
import ObjectiveTable from "../components/ObjectiveTable";

import { getObjectives } from "../services/objectivesService";

export default function ObjectivesMonitoring() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadObjectives() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getObjectives();
        setRows(data);
      } catch (error) {
        console.error("Failed to load objectives:", error);
        setRows([]);
        setErrorMessage("Unable to load objectives.");
      } finally {
        setIsLoading(false);
      }
    }

    loadObjectives();
  }, []);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <ObjectiveHeader />

      <ObjectiveToolbar />

      {errorMessage && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="mt-6">
        <ObjectiveTable
          rows={rows}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}