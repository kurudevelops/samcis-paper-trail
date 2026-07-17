import uuid
from app.core.database import SessionLocal, Base, engine
from app.features.user_roles.models import User
from app.features.departments.models import Department
from app.features.user_roles.models import RoleEnum
from app.features.documents.models import DocumentType, AcademicYear, TermEnum, DocumentStatus, Document, DocumentVersion
from app.features.document_control.models import DcrStatus, DocumentControlRequest
from datetime import datetime

# Ensure tables are created just in case
Base.metadata.create_all(bind=engine)

def add_departments(db):
    data = [
            {"name": "Computer Science and Computer Applications Development", "code": "CS-CAD"},
            {"name": "Hospitality and Tourism Management", "code": "HTM"},
            {"name": "Accountancy", "code": "ACC"},
            {"name": "Department of Business Administration and Entrepreneurship", "code": "DBAE"},
            {"name": "Information Technology and Multimedia Arts", "code": "IT-MMA"},
            {"name": "Mathematics", "code": "MATH"},
    ]
    for row in data:
        new_row = Department(
            id=str(uuid.uuid4()),
            name=row["name"],
            code=row["code"]
        )
        db.add(new_row)

def add_users(db):
    data = [
        {"first_name": "Conrado", "last_name": "Chan", "email": "cchan@slu.edu.ph", "role": RoleEnum.FACULTY},
        {"first_name": "Hector", "last_name": "Martin", "email": "hmartin@slu.edu.ph", "role": RoleEnum.FACULTY},
        {"first_name": "Lovely", "last_name": "Mejia", "email": "lmejia@slu.edu.ph", "role": RoleEnum.FACULTY},
        {"first_name": "Shyra", "last_name": "Leal", "email": "sleal@slu.edu.ph", "role": RoleEnum.FACULTY}
    ]
    for row in data:
        new_row = User(
            id=str(uuid.uuid4()),
            first_name=row["first_name"],
            last_name=row["last_name"],
            email=row["email"],
            role=row["role"]
        )
        db.add(new_row)

def add_document_types(db):
    data = [
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
    for row in data:
        new_row = DocumentType(
            id=str(uuid.uuid4()),
            prefix=row["prefix"], 
            label=row["label"]
        )
        db.add(new_row)

def add_academic_years(db):
    data = [
        {"label": "2021-2022", "is_active": False},
        {"label": "2022-2023", "is_active": False},
        {"label": "2023-2024", "is_active": False},
        {"label": "2024-2025", "is_active": False},
        {"label": "2025-2026", "is_active": True},
    ]
    for row in data:
        new_row = AcademicYear(
            id=str(uuid.uuid4()),
            label=row["label"],
            is_active=row["is_active"]
        )
        db.add(new_row)

def get_dt_id(db, prefix):
    res = db.query(DocumentType).filter(DocumentType.prefix == prefix).first()
    if res:
        return res.id;
    print(prefix, "not found");

def get_dp_id(db, code):
    res = db.query(Department).filter(Department.code == code).first();
    if res:
        return res.id;
    print(code, "not found");

def get_ay_id(db, ay):
    res = db.query(AcademicYear).filter(AcademicYear.label == ay).first();
    if res:
        return res.id;
    print(ay, "not found");

def get_usr_id(db, fname, lname):
    res = db.query(User).filter_by(first_name=fname, last_name=lname).first();
    if res:
        return res.id;
    print(fname, lname, "not found");

def get_doc_code(db, dtype_id, ay_id, t):
    dtype = db.query(DocumentType).filter(DocumentType.id == dtype_id).first().prefix;
    ay = db.query(AcademicYear).filter(AcademicYear.id == ay_id).first().label;
    num = db.query(Document).filter_by(
        doc_type_id=dtype_id, 
        academic_year_id=ay_id,
        term=t
    ).count() + 1
    return f"{dtype}-{ay}-{t.value.upper()}-{num:03d}"

def add_documents(db):
    data = [
        {
            "doc_type_id": get_dt_id(db, "SYL"),             
            "department_id": get_dp_id(db, "CS-CAD"),
            "academic_year_id": get_ay_id(db, "2025-2026"),
            "faculty_id": get_usr_id(db, "Conrado", "Chan"),
            "term": TermEnum.PRELIM,
            "status": DocumentStatus.PENDING_DEPT_HEAD,
            "is_deleted": False,
            "current_revision": 1,
            "is_original_copy_signed": False,
            "created_at": datetime(2026, 7, 10, 14, 30, 0)
        },
        {
            "doc_type_id": get_dt_id(db, "SPM"), 
            "department_id": get_dp_id(db, "HTM"),
            "academic_year_id": get_ay_id(db, "2025-2026"),
            "faculty_id": get_usr_id(db, "Hector", "Martin"),
            "term": TermEnum.MIDTERM,
            "status": DocumentStatus.COMPLETED,
            "is_deleted": False,
            "current_revision": 1,
            "is_original_copy_signed": False,
            "created_at": datetime(2026, 6, 21, 16, 40, 0)
        },
        {
            "doc_type_id": get_dt_id(db, "REC"), 
            "department_id": get_dp_id(db, "ACC"),
            "academic_year_id": get_ay_id(db, "2025-2026"),
            "faculty_id": get_usr_id(db, "Lovely", "Mejia"),
            "term": TermEnum.FINALS,
            "status": DocumentStatus.DRAFT,
            "is_deleted": False,
            "current_revision": 1,
            "is_original_copy_signed": False,
            "created_at": datetime(2026, 7, 14, 9, 0, 0)
        },
        {
            "doc_type_id": get_dt_id(db, "ACR"), 
            "department_id": get_dp_id(db, "DBAE"),
            "academic_year_id": get_ay_id(db, "2025-2026"),
            "faculty_id": get_usr_id(db, "Shyra", "Leal"),
            "term": TermEnum.MIDTERM,
            "status": DocumentStatus.DRAFT,
            "is_deleted": False,
            "current_revision": 1,
            "is_original_copy_signed": False,
            "created_at": datetime(2026, 7, 15, 13, 20, 0)
        }
    ]
    for row in data:
        new_row = Document(
            id=str(uuid.uuid4()),
            document_code=get_doc_code(
                db,
                row["doc_type_id"],
                row["academic_year_id"],
                row["term"]
            ),
            doc_type_id=row["doc_type_id"],
            department_id=row["department_id"],
            academic_year_id=row["academic_year_id"],
            faculty_id=row["faculty_id"],
            term=row["term"],
            status=row["status"],
            is_deleted=row["is_deleted"],
            current_revision=row["current_revision"],
            is_original_copy_signed=row["is_original_copy_signed"],
            created_at=row["created_at"]
        )
        db.add(new_row)

def get_doc_id(db, code):
    return db.query(Document).filter(Document.document_code == code).first().id;

def add_dcr(db):
    data = [
        {
            "document_id": get_doc_id(db, "SYL-2025-2026-PRELIM-001"),
            "requested_by": get_usr_id(db, "Conrado", "Chan"),
            "reason": "Deadline extension",
            "status": DcrStatus.PENDING,
            "requested_at": datetime(2026, 7, 12, 14, 30, 0)
        },
        {
            "document_id": get_doc_id(db, "SPM-2025-2026-MIDTERM-001"),
            "requested_by": get_usr_id(db, "Hector", "Martin"),
            "reason": "Amendment of approved document",
            "status": DcrStatus.PENDING,
            "requested_at": datetime(2026, 7, 8, 10, 30, 0)
        }
    ]
    for row in data:
        new_row = DocumentControlRequest(
            id=str(uuid.uuid4()),
            document_id=row["document_id"],
            requested_by=row["requested_by"],
            reason=row["reason"],
            status=row["status"],
            requested_at=row["requested_at"]
        )
        db.add(new_row);

def add_document_versions(db):
    data = [
        {
            "revision_number": 1, 
            "file_path": "uploads/SYL-2025-2026-PRELIM-001.pdf",
            "code": "SYL-2025-2026-PRELIM-001"
        },
        {
            "revision_number": 1, 
            "file_path": "uploads/SPM-2025-2026-MIDTERM-001.pdf",
            "code": "SPM-2025-2026-MIDTERM-001"
        },
        {
            "revision_number": 1, 
            "file_path": "uploads/REC-2025-2026-FINALS-001.pdf",
            "code": "REC-2025-2026-FINALS-001"
        },
        {
            "revision_number": 1, 
            "file_path": "uploads/ACR-2025-2026-MIDTERM-001.pdf",
            "code": "ACR-2025-2026-MIDTERM-001"
        },
    ]
    for row in data:
        doc = db.query(Document).filter_by(document_code=row["code"]).first();
        new_row = DocumentVersion(
            id=str(uuid.uuid4()),
            document_id=doc.id,
            revision_number=row["revision_number"],
            file_path=row["file_path"],
            uploaded_by=doc.faculty_id,
            uploaded_at=doc.created_at
        )
        db.add(new_row)

def seed_data(model, add_data):
    db = SessionLocal()
    try:
        # Check if the database is already seeded to prevent duplicates
        if db.query(model).count() > 0:
            print(f"{model} already seeded. Skipping.")
            return
        add_data(db)
        db.commit() # Save to db
        print(f"Successfully seeded {model} into the database!")
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Starting database seeding process...")
    for model, add_function in [
        (Department, add_departments),
        (User, add_users),
        (DocumentType, add_document_types),
        (AcademicYear, add_academic_years),
        (Document, add_documents),
        (DocumentControlRequest, add_dcr),
        (DocumentVersion, add_document_versions)
    ]:
        seed_data(model, add_function)