from sqlalchemy.orm import Session
from app.core.database import engine # Ensure this matches what you called your engine/SessionLocal
from app.features.documents.models import DocumentType

# The extracted list of deliverables from GL-SMI-006
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
    {"prefix": "AFAR", "label": "Accomplishment and Faculty Activity Report"},
    {"prefix": "PTF", "label": "Course Portfolio"},
    {"prefix": "RCI", "label": "Reflection and Continuous Improvement Report"},
    {"prefix": "FDP", "label": "Faculty Development Plan"},
    
    # Department Head Docs
    {"prefix": "FLM", "label": "Faculty Loading Matrix"},
    {"prefix": "DOP", "label": "Department Operational Plan"},
    {"prefix": "PMP", "label": "Program Monitoring Plan"},
    {"prefix": "FCM", "label": "Faculty Classroom Monitoring Report"},
    {"prefix": "DPR", "label": "Department Performance Report"},
    {"prefix": "CIM", "label": "Curriculum Implementation Monitoring Report"},
    {"prefix": "DAR", "label": "Department Accomplishment Report"},
    {"prefix": "PAR", "label": "Program Assessment Report"},
    {"prefix": "ERA", "label": "Enrollment and Retention Analysis"},
    {"prefix": "QAC", "label": "Accreditation and QA Compliance Report"}
]

def seed_database():
    """Injects standard document types into the database."""
    print("🌱 Starting database seed...")
    
    # Open a direct connection to the database
    with Session(engine) as session:
        for doc_data in document_types_seed:
            # Check if this prefix already exists to avoid duplicates
            existing = session.query(DocumentType).filter_by(prefix=doc_data["prefix"]).first()
            
            if not existing:
                new_type = DocumentType(
                    prefix=doc_data["prefix"], 
                    label=doc_data["label"]
                )
                session.add(new_type)
                print(f"  [+] Added: {doc_data['prefix']} - {doc_data['label']}")
            else:
                print(f"  [-] Skipped (Already exists): {doc_data['prefix']}")
        
        # Save all changes to the database
        session.commit()
        print("✅ Seeding complete! All document types are ready.")

if __name__ == "__main__":
    seed_database()