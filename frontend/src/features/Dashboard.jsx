import { useState } from 'react';
import { useEffect } from 'react';

function Dashboard() {    
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [cluster, setCluster] = useState('');

    const [rfaCount, setRfaCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [requestCount, setRequestCount] = useState(0);
    const [documentCount, setDocumentCount] = useState(0);


    // TODO: fetch actual values from DB
    // temporary placeholder values
    useEffect(() => {
        setName('Conrado Chan');
        setUnit('SMI');
        setCluster('Academic');        
    }, []);    

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
        </div>
    )
}

export default Dashboard;