import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./features/dashboard/Dashboard";
import DocumentControlRequest from "./features/document-control-requests/DocumentControlRequest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Everything shares the sidebar via AppLayout */}
        <Route
          element={<AppLayout onLogout={() => console.log("Logout clicked")} />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/document-control-requests"
            element={<DocumentControlRequest />}
          />
        </Route>

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;