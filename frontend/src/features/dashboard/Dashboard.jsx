<<<<<<< HEAD
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard (){
    // Welcome header data    
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [unit, setUnit] = useState('');
    const [cluster, setCluster] = useState('');

    // Card data (database object counts)
    const [rfaCount, setRfaCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [requestCount, setRequestCount] = useState(0);
    const [documentCount, setDocumentCount] = useState(0);

    // Bar chart data
    const [documentStatuses, setDocumentStatuses] = useState(null);

    useEffect(() => {
        // Placeholders until auth is implemented
        setFname('Conrado');
        setLname('Chan');
        setUnit('SMI');
        setCluster('Academic');

        // --- FETCH REAL DATA FROM FASTAPI BACKEND ---
        const fetchDashboardStats = async () => {
            try {
                // 1. Fetch total documents from Analytics Router
                const statsResponse = await axios.get('http://127.0.0.1:8000/api/v1/analytics/dashboard');
                setDocumentCount(statsResponse.data.total_documents);
                setDocumentStatuses(statsResponse.data.documents_by_status);

                // 2. Fetch pending requests from Document Control Router
                const dcrResponse = await axios.get('http://127.0.0.1:8000/api/v1/document-control/pending');
                setPendingCount(dcrResponse.data.length);
                setRequestCount(dcrResponse.data.length); // Total DCRs active

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            }
        };

        fetchDashboardStats();
    }, []);

    return(
        <div className ="bg-white rounded-2xl p-6 shadow-sm">
            <h1 className ="text-2xl text-justify text-gray-800 font-bold">Dashboard</h1>
            <p className ="text-sm text-gray-500">Welcome Back, {fname} {lname} | Unit: {unit} | Cluster: {cluster}</p>

            <div className="grid grid-cols-4 p-6 gap-4">
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center text-center">
                    <div>Requests for Action</div>
                    <div>{rfaCount}</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center text-center">
                    <div>Pending Document Control Requests</div>
                    <div>{pendingCount}</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center text-center">
                    <div>Document Control Requests</div>
                    <div>{requestCount}</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center text-center">
                    <div>Documents</div>
                    <div>{documentCount}</div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard;
=======
import { useEffect, useState } from "react";
import apiClient from "../../api/client";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        const response = await apiClient.get("/analytics/dashboard");
        if (!cancelled) {
          setStats(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.detail || "Failed to load dashboard.");
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-sm text-gray-500">Analytics snapshot</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-gray-100 p-4 text-center">
          <div className="text-sm text-gray-500">Total Docs</div>
          <div className="text-2xl font-bold text-gray-800">{stats?.total_documents ?? "..."}</div>
        </div>
        <div className="rounded-lg bg-gray-100 p-4 text-center">
          <div className="text-sm text-gray-500">Users</div>
          <div className="text-2xl font-bold text-gray-800">{stats?.total_users ?? "..."}</div>
        </div>
        <div className="rounded-lg bg-gray-100 p-4 text-center">
          <div className="text-sm text-gray-500">Submission Windows</div>
          <div className="text-2xl font-bold text-gray-800">{stats?.active_submission_windows ?? "..."}</div>
        </div>
        <div className="rounded-lg bg-gray-100 p-4 text-center">
          <div className="text-sm text-gray-500">Status Buckets</div>
          <div className="text-2xl font-bold text-gray-800">{stats?.documents_by_status?.length ?? "..."}</div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> pulmano/beta
