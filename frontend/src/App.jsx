import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Dashboard from "./features/dashboard/Dashboard";
import DocumentControlRequest from "./features/document-control-requests/DocumentControlRequest";

import ObjectivesMonitoring from "./features/eoms/objectives/pages/ObjectivesMonitoring";
import ControlledDocuments from "./features/eoms/controlled-documents/pages/ControlledDocuments";
import PlanningDocuments from "./features/eoms/planning/pages/PlanningDocuments";
import QualityRecords from "./features/eoms/quality-records/pages/QualityRecords";
import RequestForAction from "./features/eoms/request-for-action/pages/RequestForAction";

import CalendarPage from "./features/calendar/pages/CalendarPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AppLayout
              onLogout={() => console.log("Logout clicked")}
            />
          }
        >
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* EOMS */}
          <Route
            path="/controlled-documents"
            element={<ControlledDocuments />}
          />

          <Route
            path="/planning-documents"
            element={<PlanningDocuments />}
          />

          <Route
            path="/objectives-and-target-monitoring"
            element={<ObjectivesMonitoring />}
          />

          <Route
            path="/quality-records"
            element={<QualityRecords />}
          />

          <Route
            path="/request-for-action"
            element={<RequestForAction />}
          />

          {/* Document Control Requests */}
          <Route
            path="/document-control-requests"
            element={<DocumentControlRequest />}
          />

          {/* Calendar */}
          <Route
            path="/calendar"
            element={<CalendarPage />}
          />

          {/* Root redirect */}
          <Route
            index
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />
        </Route>

        {/* Unknown URL redirect */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;