import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import Dashboard from './features/Dashboard';
import Repository from './features/Repository';
import DocumentControlRequests from './features/DocumentControlRequests';;
import Calendar from './features/Calendar';
import QualityRecords from './features/QualityRecords';
import QOM from './features/QOM';
import RFA from './features/RFA';
import Profile from './features/Profile';
import SignIn from './features/SignIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [    
      {index: true, element: <Dashboard />},
      {path: 'repository', element: <Repository />},
      {path: 'document-control-requests', element: <DocumentControlRequests />},
      {path: 'calendar', element: <Calendar />},
      {path: 'quality-records', element: <QualityRecords />},
      {path: 'qom', element: <QOM />},
      {path: 'rfa', element: <RFA />},
      {path: 'profile', element: <Profile />}
    ]
  },
  {
    path: 'sign-in', 
    element: <SignIn />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
