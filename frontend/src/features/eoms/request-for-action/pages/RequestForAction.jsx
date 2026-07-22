import { useEffect, useState } from "react";

import RequestForActionHeader from "../components/RequestForActionHeader";
import RequestForActionToolbar from "../components/RequestForActionToolbar";
import RequestForActionTable from "../components/RequestForActionTable";

import {
  getRequestForActions,
} from "../services/requestForActionService";

export default function RequestForAction() {
  const [records, setRecords] = useState([]);

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    async function loadRequestForActions() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const filters = {
          search,
          fromDate,
          toDate,
        };

        const data =
          await getRequestForActions(filters);

        setRecords(data);
      } catch (error) {
        console.error(
          "Failed to load Request for Action records:",
          error
        );

        setRecords([]);
        setErrorMessage(
          "Unable to load Request for Action records."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadRequestForActions();
  }, [
    search,
    fromDate,
    toDate,
  ]);

  function handleView(record) {
    console.log("View", record);
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      <RequestForActionHeader />

      <RequestForActionToolbar
        search={search}
        fromDate={fromDate}
        toDate={toDate}
        onSearchChange={(event) =>
          setSearch(event.target.value)
        }
        onFromDateChange={(event) =>
          setFromDate(event.target.value)
        }
        onToDateChange={(event) =>
          setToDate(event.target.value)
        }
      />

      {errorMessage && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-lg border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Loading Request for Action records...
        </div>
      ) : (
        <RequestForActionTable
          rows={records}
          onView={handleView}
        />
      )}

      {/*
      ======================================================

      BACKEND TEAM

      Replace the placeholder service with:

      GET /api/request-for-actions

      Supported filters:

      search
      fromDate
      toDate

      ======================================================
      */}
    </div>
  );
}