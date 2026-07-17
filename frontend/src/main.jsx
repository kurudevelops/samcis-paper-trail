import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from "./App";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./features/dashboard/Dashboard";
import DocumentControlRequest from "./features/document-control-requests/DocumentControlRequest";

import ObjectivesMonitoring from "./features/eoms/pages/ObjectivesMonitoring";
import PlanningDocuments from "./features/eoms/pages/PlanningDocuments";

import Login from "./features/auth/Login";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout onLogout={() => router.navigate('/login')}/>,
    children: [
      {index: true, element: <App />},    
      {path: 'dashboard', element: <Dashboard />},
      {path: 'document-control-requests', element: <DocumentControlRequest />},
      {path: 'planning-documents', element: <PlanningDocuments />},
      {path: 'objectives-and-target-monitoring', element: <ObjectivesMonitoring />}
    ]
  }, { path: 'login', element: <Login />}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
