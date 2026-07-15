import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import Global Styles and Root Layout
import './styles/index.css';
import App from './App.jsx';

// Import Feature Components
import Dashboard from './features/Dashboard.jsx';
import Repository from './features/Repository.jsx';
import Documents from './features/DocumentControlRequests.jsx'; 
import Calendar from './features/Calendar.jsx';
import QualityRecords from './features/QualityRecords.jsx';
import QOM from './features/QOM.jsx';
import RFA from './features/RFA.jsx';
import Profile from './features/Profile.jsx';

// Define the Routing Tree
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "/",
        element: <Dashboard />, 
      },
      {
        path: "/repository",
        element: <Repository />,
      },
      {
        path: "/document-control-requests",
        element: <Documents />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/quality-records",
        element: <QualityRecords />,
      },
      {
        path: "/qom",
        element: <QOM />,
      },
      {
        path: "/rfa",
        element: <RFA />,
      },
      {
        path: "/profile",
        element: <Profile />,
      }
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);