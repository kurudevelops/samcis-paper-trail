import enum
from sqlalchemy.orm import Session
from app.core.database import engine, Base

# Force SQLAlchemy to recognize the models before running create_all
from app.features.user_roles.models import User, Department
from app.features.documents.models import DocumentType, Document, DocumentVersion
from app.features.workflow.models import StatusLog, Signature
from app.features.submission_windows.model import SubmissionWindow
from app.features.notifications.models import Notification

# 🏢 Official SAMCIS Departments
departments_seed = [
    {"id": "BAE", "code": "BAE", "name": "Business Administration Entrepreneurship"},
    {"id": "IT_MMA", "code": "IT & MMA", "name": "IT & MMA"},
    {"id": "CS_CAD", "code": "CS & CAD", "name": "CS & CAD"},
    {"id": "ACT", "code": "Accountancy", "name": "Accountancy"},
    {"id": "HTM", "code": "HTM", "name": "Hotel & Tourism Management"},
    {"id": "MATH", "code": "Math", "name": "Mathematics Department"}
]

# 📄 Full List of Deliverables Extracted from GL-SMI-006
document_types_seed = [
    # Faculty - Pre-Semester
    {"prefix": "SYL", "label": "Course Syllabus"},
    {"prefix": "CGL", "label": "Course Guidelines"},
    {"prefix": "TOS", "label": "Delivery Plan / Table of Specifications"},
    {"prefix": "ASM", "label": "Assessment Plan"},
    {"prefix": "LRL", "label": "Learning Resources List"},
    {"prefix": "CNS", "label": "Consultation Schedule"},
    
    # Faculty - Mid-Semester
    {"prefix": "SPM", "label": "Student Performance Monitoring Report"},
    {"prefix": "ACR", "label": "Assessment Compliance Report"},
    {"prefix": "ARS", "label": "At-Risk Student Report"},
    {"prefix": "CDO", "label": "Consultation Documentation"},
    
    # Faculty - End-of-Semester
    {"prefix": "REC", "label": "Class Records"},
    {"prefix": "GSC", "label": "Grade Submission Confirmation"},
    {"prefix": "AFR", "label": "Accomplishment and Faculty Activity Report"},
    {"prefix": "PTF", "label": "Course Portfolio"},
    {"prefix": "RCI", "label": "Reflection and Continuous Improvement Report"},
    {"prefix": "FDP", "label": "Faculty Development Plan"},
    
    # Department Head Docs - Pre-Semester
    {"prefix": "FLM", "label": "Faculty Loading Matrix"},
    {"prefix": "DOP", "label": "Department Operational Plan"},
    {"prefix": "PMP", "label": "Program Monitoring Plan"},
    
    # Department Head Docs - Mid-Semester
    {"prefix": "FCM", "label": "Faculty Classroom Monitoring Report"},
    {"prefix": "DPR", "label": "Department Performance Report"},
    {"prefix": "CIM", "label": "Curriculum Implementation Monitoring Report"},
    
    # Department Head Docs - End-of-Semester
    {"prefix": "DAR", "label": "Department Accomplishment Report"},
    {"prefix": "PAR", "label": "Program Assessment Report"},
    {"prefix": "ERA", "label": "Enrollment and Retention Analysis"},
    {"prefix": "QAC", "label": "Accreditation and QA Compliance Report"}
]

def seed_database():
    print("🌱 Starting database seed...")
    
    # This physically creates the missing SQLite tables based on the models above
    Base.metadata.create_all(bind=engine)
    
    with Session(engine) as session:
        # --- Seed Departments ---
        print("🏢 Seeding departments...")
        for dept_data in departments_seed:
            existing_dept = session.query(Department).filter_by(id=dept_data["id"]).first()
            if not existing_dept:
                new_dept = Department(
                    id=dept_data["id"],
                    code=dept_data["code"],
                    name=dept_data["name"]
                )
                session.add(new_dept)
                print(f"  [+] Added Department: {dept_data['code']}")
            else:
                print(f"  [-] Skipped Department (Exists): {dept_data['code']}")
        
        # --- Seed Document Types ---
        print("📄 Seeding document types...")
        for doc_data in document_types_seed:
            existing_type = session.query(DocumentType).filter_by(prefix=doc_data["prefix"]).first()
            if not existing_type:
                new_type = DocumentType(
                    prefix=doc_data["prefix"], 
                    label=doc_data["label"]
                )
                session.add(new_type)
                print(f"  [+] Added Doc Type: {doc_data['prefix']}")
            else:
                print(f"  [-] Skipped Doc Type (Exists): {doc_data['prefix']}")
        
        session.commit()
        print("✅ Database successfully built and seeded!")

if __name__ == "__main__":
    seed_database()