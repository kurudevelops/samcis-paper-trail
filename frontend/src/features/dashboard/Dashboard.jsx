import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard () {
    // Welcome header data  
    const [user] = useOutletContext();
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
        <>
        {user && <div className ="bg-white rounded-2xl p-6 shadow-sm">
            <h1 className ="text-2xl text-justify text-gray-800 font-bold">Dashboard</h1>            
            <p className ="text-sm text-gray-500">Welcome Back, {user.first_name} {user.last_name} | Unit: {unit} | Cluster: {cluster}</p>
            

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
        </div>}
        </>
    )
}

export default Dashboard;