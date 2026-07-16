import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {    
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [cluster, setCluster] = useState('');

    const [rfaCount, setRfaCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [requestCount, setRequestCount] = useState(0);
    const [documentCount, setDocumentCount] = useState(0);
    const [documentStatuses, setDocumentStatuses] = useState(null);

    const [statusCounts, setStatusCounts] = useState({});
    const [formW, setFormW] = useState('');
    const [guidelinesW, setGuidelinesW] = useState('');
    const [procedureManualW, setProcedureManualW] = useState('');
    const [workInstructionW, setWorkInstructionW] = useState('');
    const [internalDocumentW, setInternalDocumentW] = useState('');
    const [externalDocumentW, setExternalDocumentW] = useState('');

    useEffect(() => {
        // User information placeholders (until Auth is wired)
        setName('Conrado Chan');
        setUnit('SMI');
        setCluster('Academic');

        // --- FETCH REAL DATA FROM FASTAPI BACKEND ---
        const fetchDashboardStats = async () => {
            try {
                // 1. Fetch total documents from Analytics Router
                const statsResponse = await axios.get('http://127.0.0.1:8000/api/v1/analytics/dashboard');
                setDocumentCount(statsResponse.data.total_documents);
                console.log(statsResponse.data.documents_by_status);
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

    const barChartNumberLabels = [];
    for (let i = 0; i <= 90; i += 10) {
        barChartNumberLabels.push(i);
    }

    return (
        <div className="content dashboard">
            <h1>Dashboard</h1>
            <p>Welcome back, <span className='bold'>{name} </span>
             | Unit: <span className='bold blue'>{unit} </span> 
             | Cluster: <span className='bold'>{cluster}</span>
            </p>
            <div className='object-counts-container'>
                <div className='rfa-count'>
                    <h3>Requests for Action</h3>
                    <div className='count'>{rfaCount}</div>
                    <div>Audit non-conformances</div>
                </div>
                <div className='pending-count'>
                    <h3>Pending Document Control Requests</h3>
                    <div className='count'>{pendingCount}</div>
                    <div>Awaiting document control approval</div>
                </div>
                <div className='request-count'>
                    <h3>Document Control Requests</h3>
                    <div className='count'>{requestCount}</div>
                    <div>SMI</div>
                </div>
                <div className='documents-count'>
                    <h3>Documents</h3>
                    <div className='count'>{documentCount}</div>
                    <div>SMI</div>
                </div>                
            </div>   
         
            <div className="charts">
                <div className='bar-chart-container'>
                    <h3  className='card-header'>Document Status</h3>
                    <dl className='bar-chart'>   
                        {documentStatuses && documentStatuses.map((row) => (                            
                            <dd className="percentage" key={row.status}>
                                <span className="text">{
                                    // Replace all underscores & convert to title case
                                    row.status.replaceAll('_', ' ')
                                    .toLowerCase()
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ')
                                }</span>
                                <div className="bar" style={{ width: row.count }}></div>
                            </dd>
                        ))}  
                        <dd className="bar-chart-labels">
                            {barChartNumberLabels.map((label) => {
                                return (<div>{label}</div>)
                            })}
                        </dd>                     
                    </dl>                       
                </div>                        
                <div className='pie-chart-container'>
                    <h3 className='card-header'>SMI Document Control Requests</h3>
                    <PieChart
                    data={[
                        { label: "Form", value: 70, color: "#0071bc" },
                        { label: "Guidelines", value: 10, color: "#00a99d" },
                        { label: "Procedure Manual", value: 5, color: "#37bc00" },
                        { label: "Work Instruction", value: 5, color: "#eecc16" },
                        { label: "Internal Documents", value: 5, color: "#f7931e" },
                        { label: "External Documents", value: 5, color: "#c1272d" },
                    ]}/>
                    <ul className="pie-chart-colors">
                        <li><div className='color form'></div> Form</li>
                        <li><div className='color guidelines'></div> Guidelines</li>
                        <li><div className='color procedure-manual'></div> Procedure Manual</li>
                        <li><div className='color work-instruction'></div> Work Instruction</li>
                        <li><div className='color internal-documents'></div> Internal Documents</li>
                        <li><div className='color external-documents'></div> External Documents</li>
                    </ul>
                </div>      
            </div>  
        </div>        
    )
}

function PieChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  let cumulative = 0;
  const gradientParts = data.map((d) => {
    const start = (cumulative / total) * 360;
    cumulative += d.value;
    const end = (cumulative / total) * 360;
    return `${d.color} ${start}deg ${end}deg`;
  });

  const style = {
    width: 200,
    height: 200,
    borderRadius: "50%",
    background: `conic-gradient(${gradientParts.join(", ")})`,
  };

  return <div className='pie-chart' style={style} />;
}

export default Dashboard;