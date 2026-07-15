import { useState } from 'react';
import { useEffect } from 'react';

function Dashboard() {    
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [cluster, setCluster] = useState('');

    const [rfaCount, setRfaCount] = useState(0);
    const [pendingDcrCount, setPendingDcrCount] = useState(0);
    const [dcrCount, setDcrCount] = useState(0);
    const [documentCount, setDocumentCount] = useState(0);

    const [statusCounts, setStatusCounts] = useState({});

    // TODO: add loading message/visual while fetching data
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/documents/dashboard-data')
            .then((res) => {
                if (res.status >= 400) {
                    throw Error('Server error');
                }
                return res.json()
            })
            .then((data) => {
                setPendingDcrCount(data.pendingDcrCount);
                setDcrCount(data.dcrCount);
                setDocumentCount(data.docCount);
                setStatusCounts(data.statusCounts);
            });

        // user information
        setName('Conrado Chan');
        setUnit('SMI');
        setCluster('Academic');
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
                    <div className='count'>{pendingDcrCount}</div>
                    <div>Awaiting document control approval</div>
                </div>
                <div className='request-count'>
                    <h3>Document Control Requests</h3>
                    <div className='count'>{dcrCount}</div>
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
                        {Object.entries(statusCounts).map(([label, count]) => (
                            <dd className="percentage" key={label}>
                                <span className="text">{
                                    // Replace all underscores & convert to title case
                                    label.replaceAll('_', ' ')
                                    .toLowerCase()
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ')
                                }</span>
                                <div className="bar" style={{ width: count }}></div>
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
                    <h3 className='card-header'>SMI Document Control Requests (Placeholder Data)</h3>
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