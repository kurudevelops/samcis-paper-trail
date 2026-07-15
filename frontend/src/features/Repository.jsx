import { useState, useEffect } from 'react';

function Repository() {
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/documents/all-documents')
            .then((res) => {
                if (res.status >= 400) {
                    throw Error('Server error');
                }
                return res.json()
            })
            .then((data) => {
                setDocuments(data);
            });
    }, []); 

    return (
        <div className="content repository">
            <h1>Repository</h1>
            {!documents && <p>Loading...</p>}
            {documents && <table>                
                <tr>
                    <th>Document Code</th>
                    <th>Uploader</th>
                    <th>Current Revision</th>
                    <th>Status</th>
                    <th>Created At</th>
                </tr>
                {documents.map((doc) => (
                    <tr>
                        <td>{doc.documentCode}</td>
                        <td>{doc.uploader}</td>                        
                        <td>{doc.currentRevision}</td>
                        <td>{doc.status}</td>
                        <td>{doc.createdAt}</td>
                    </tr>
                ))}
            </table>}
        </div>
    );
}

export default Repository;