import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './index.css';

import App from "./App";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./features/dashboard/Dashboard";
import DocumentControlRequest from "./features/document-control-requests/DocumentControlRequest";

import ObjectivesMonitoring from "./features/eoms/pages/ObjectivesMonitoring";
import PlanningDocuments from "./features/eoms/pages/PlanningDocuments";
import PlanningTable from "./features/eoms/components/PlanningTable";
import NewDocumentForm from "./features/eoms/pages/NewDocumentForm";

import Login from "./features/auth/Login";

const api = axios.create({withCredentials: true});
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout onLogout={async () => {
      try {
        await api.post('http://localhost:8000/api/v1/auth/logout');
      } catch(err) {
        console.error(err);
      } finally {
        router.navigate('/login')
      }
      
    }}/>,
    children: [
      {index: true, element: <App />},    
      {path: 'dashboard', element: <Dashboard />},
      {path: 'document-control-requests', element: <DocumentControlRequest />},
      {path: 'planning-documents', element: <PlanningDocuments />},
      {path: 'new-document', element: <NewDocumentForm />},      
      {path: 'objectives-and-target-monitoring', element: <ObjectivesMonitoring />}
    ]
  }, { path: 'login', element: <Login />}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
