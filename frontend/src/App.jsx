import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import SignIn from "./features/SignIn";
import Dashboard from "./features/dashboard/Dashboard";
import RepositoryPage from "./features/documents/RepositoryPage";
import UploadDocumentPage from "./features/documents/UploadDocumentPage";
import SubmissionWindowsPage from "./features/submission-windows/SubmissionWindowsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/repository" element={<RepositoryPage />} />
            <Route path="/submissions" element={<UploadDocumentPage />} />
            <Route path="/upload" element={<Navigate to="/submissions" replace />} />
            <Route path="/submission-windows" element={<SubmissionWindowsPage />} />
            <Route index element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;