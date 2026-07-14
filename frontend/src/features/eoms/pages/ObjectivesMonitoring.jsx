import { useEffect, useState } from "react";

import ObjectiveHeader from "../components/ObjectiveHeader";
import ObjectiveToolbar from "../components/ObjectiveToolbar";
import ObjectiveTable from "../components/ObjectiveTable";

import { getObjectives } from "../services/eomsService";

export default function ObjectivesMonitoring() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function loadObjectives() {
      const data = await getObjectives();
      setRows(data);
    }

    loadObjectives();
  }, []);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">

      <ObjectiveHeader />

      <ObjectiveToolbar />

      <ObjectiveTable rows={rows} />

    </div>
  );
}