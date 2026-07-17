import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "./Sidebar";

function AppLayout({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
          try {
              axios.get('http://localhost:8000/api/v1/auth/me', { withCredentials: true })
                  .then(res => setUser(res.data))
                  .catch(() => setLoggedOut(true)); // redirect to login page if not logged in
          } catch (error) {
              console.error(error);
          }
      };

      fetchCurrentUser();
  }, []);
  
  return (
    <>
    {user && <div className="flex min-h-screen">
      <Sidebar
        activePath={location.pathname}
        onNavigate={(path) => navigate(path)}
        onLogout={onLogout}
      />

      <main className="flex-1 p-6 overflow-y-auto bg-gray-200">
        <Outlet context={[user]}/>
      </main>
    </div>}
    {loggedOut && <Navigate to="/login" replace />}
    </>
  );
}

export default AppLayout;