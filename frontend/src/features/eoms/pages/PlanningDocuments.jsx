import { useEffect, useState } from "react";

import PlanningHeader from "../components/PlanningHeader";
import PlanningToolbar from "../components/PlanningToolbar";
import PlanningTable from "../components/PlanningTable";

import { getPlanningDocuments } from "../services/planningService";

export default function PlanningDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // ======================================================
    // BACKEND TEAM
    //
    // Replace this with an Axios request.
    //
    // Example:
    // getPlanningDocuments().then(setDocuments);
    // ======================================================

    async function loadDocuments() {
      const data = await getPlanningDocuments();
      setDocuments(data);
    }

    loadDocuments();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-8">

      <PlanningHeader />

      <PlanningToolbar />

      <PlanningTable rows={documents} />

    </div>
  );
}