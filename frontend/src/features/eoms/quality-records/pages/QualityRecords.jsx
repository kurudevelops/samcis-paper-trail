import { useEffect, useState } from "react";

import QualityHeader from "../components/QualityHeader";
import QualityToolbar from "../components/QualityToolbar";
import QualityTable from "../components/QualityTable";

import {
  getQualityRecords,
} from "../services/qualityRecordsService";

export default function QualityRecords() {
  const [records, setRecords] = useState([]);

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function loadRecords() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getQualityRecords(search);

        setRecords(data);
      } catch (error) {
        console.error(error);

        setRecords([]);

        setErrorMessage(
          "Unable to load quality records."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadRecords();
  }, [search, refreshKey]);

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  function handleRefresh() {
    setRefreshKey((previous) => previous + 1);
  }

  function handleUpload() {
    // ============================================
    // BACKEND TEAM
    //
    // Open upload modal or redirect to upload page.
    // ============================================

    console.log("Upload placeholder");
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-md">
      <QualityHeader />

      <QualityToolbar
        search={search}
        onSearchChange={handleSearchChange}
        onUpload={handleUpload}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      {errorMessage && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="mt-6">
        <QualityTable
          rows={records}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}