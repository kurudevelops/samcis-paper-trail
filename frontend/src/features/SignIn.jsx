import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleDevLogin = async (email, role, departmentCode) => {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.post("/auth/dev-login", null, {
        params: {
          email,
          role,
          department_code: departmentCode,
        },
      });

      login(response.data);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Development login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">SAMCIS Paper Trail</h1>
        <p className="mb-6 text-center text-sm text-gray-500">Sign in to your account</p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleDevLogin("faculty123@test.com", "faculty", "CS_CAD")}
            disabled={loading}
            className="w-full rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition duration-200 hover:bg-blue-100"
          >
            Test as Faculty
          </button>
          <button
            onClick={() => handleDevLogin("auditor123@test.com", "auditor", "ACT")}
            disabled={loading}
            className="w-full rounded-lg bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 transition duration-200 hover:bg-amber-100"
          >
            Test as Auditor
          </button>
          <button
            onClick={() => handleDevLogin("secretary123@test.com", "secretary", "BAE")}
            disabled={loading}
            className="w-full rounded-lg bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition duration-200 hover:bg-emerald-100"
          >
            Test as Secretary
          </button>
          <button
            onClick={() => handleDevLogin("dean123@test.com", "dean", "IT_MMA")}
            disabled={loading}
            className="w-full rounded-lg bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 transition duration-200 hover:bg-purple-100"
          >
            Test as Dean
          </button>
          <button
            onClick={() => handleDevLogin("admin123@test.com", "administrator", "BAE")}
            disabled={loading}
            className="w-full rounded-lg bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 transition duration-200 hover:bg-orange-100"
          >
            Test as Administrator
          </button>
        </div>
      </div>
    </div>
  );
}