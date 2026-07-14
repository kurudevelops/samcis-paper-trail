import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Dashboard from "./features/dashboard/Dashboard";
import DocumentControlRequest from "./features/document-control-requests/DocumentControlRequest";

import ObjectivesMonitoring from "./features/eoms/pages/ObjectivesMonitoring";
import PlanningDocuments from "./features/eoms/pages/PlanningDocuments";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==========================================
            All pages inside AppLayout
            automatically receive the Sidebar.
        ========================================== */}

        <Route
          element={
            <AppLayout
              onLogout={() => console.log("Logout clicked")}
            />
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/objectives-and-target-monitoring"
            element={<ObjectivesMonitoring />}
          />

          <Route
            path="/planning-documents"
            element={<PlanningDocuments />}
          />

          <Route
            path="/document-control-requests"
            element={<DocumentControlRequest />}
          />
        </Route>

        {/* Redirect root to Dashboard */}

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;