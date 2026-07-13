import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css'
import App from './App'
import Dashboard from './features/Dashboard'
import Documents from './features/Documents';
import DocumentControlRequests from './features/DocumentControlRequests';
import Calendar from './features/Calendar';
import UserManual from './features/UserManual';
import SignIn from './features/SignIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [    
      {index: true, element: <Dashboard />},
      {path: 'documents', element: <Documents />},
      {path: 'document-control-requests', element: <DocumentControlRequests />},
      {path: 'calendar', element: <Calendar />},
      {path: 'user-manual', element: <UserManual />}
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
