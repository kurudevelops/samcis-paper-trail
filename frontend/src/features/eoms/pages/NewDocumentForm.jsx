import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';

function DropdownInput({ label, value, onChange, loadOptions }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
        <option value="">{label}</option>
        {loadOptions()}
    </select>
  );
}

function FileInput({ onFileSelect }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <input
      type="file"
      accept=".pdf,.docx"
      onChange={handleChange}
      className="block w-full text-sm text-gray-500
                 file:mr-4 file:rounded-md file:border-0
                 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium
                 file:text-blue-700 hover:file:bg-blue-100"
    />
  );
}

async function handleUpload(file, documentType, department, academicYear, term) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);
    formData.append("department", department);
    formData.append("academicYear", academicYear);
    formData.append("term", term); 
    const res = await axios.post(
        "http://localhost:8000/api/v1/documents/upload", 
        formData, 
        {withCredentials: true},
        {headers: { "Content-Type": "multipart/form-data" }}
    );
    return res.data;
}

export default function NewDocument() {
    const navigate = useNavigate();

    const [documentTypes, setDocumentTypes] = useState(null);
    const [departments, setDepartments] = useState(null);
    const [academicYears, setAcademicYears] = useState(null);    

    const [documentType, setDocumentType] = useState("");
    const [department, setDepartment] = useState("");
    const [academicYear, setAcademicYear] = useState("");    
    const [term, setTerm] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        async function loadData(path, setData) {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/${path}`);
                setData(res.data);
            } catch(err) {
                console.error(err);
            }
        }
        loadData('departments/all-departments', setDepartments);
        loadData('documents/all-academic-years', setAcademicYears); 
        loadData('documents/all-document-types', setDocumentTypes)
    }, [])
    return (
        <div>
            <h1>New Document</h1>
            <button onClick={() => navigate(-1)}>Back</button>
            <form>   
                {documentTypes && <DropdownInput 
                    label="Document Type"
                    value={documentType}
                    onChange={setDocumentType}
                    loadOptions={() => (                     
                        documentTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.label} ({type.prefix})
                            </option>
                        ))
                    )}
                />} 
                {departments && <DropdownInput 
                    label="Department"
                    value={department}
                    onChange={setDepartment}
                    loadOptions={() => (                     
                        departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name} ({dept.code})
                            </option>
                        ))
                    )}
                />}  
                {academicYears && <DropdownInput 
                    label="Academic Year"
                    value={academicYear}
                    onChange={setAcademicYear}
                    loadOptions={() => (                     
                        academicYears.map((ay) => (
                            <option key={ay.id} value={ay.id}>
                                {ay.label}
                            </option>
                        ))
                    )}
                />}  
                <DropdownInput 
                    label="Term"
                    value={term}
                    onChange={setTerm}
                    loadOptions={() => (                                             
                        ['Prelim', 'Midterm', 'Finals'].map((term) => (
                            <option key={term} value={term.toUpperCase()}>
                                {term}
                            </option>
                        ))
                    )}
                />  
                <FileInput onFileSelect={setFile} />
                <button onClick={(e) => {
                    e.preventDefault();
                    handleUpload(file, documentType, department, academicYear, term);
                }}>
                    Upload
                </button>                  
            </form>
        </div>
    )
}