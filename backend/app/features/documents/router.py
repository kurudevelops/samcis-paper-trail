from fastapi import APIRouter, Depends, UploadFiule, File, Form, HTTPSException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.features.auth.dependencies import get_current_user
from app.features.documents.models import Document, DocumentVersion, DocumentType, AcademicYear, TermEnum
from app.features.departments.models import Department
from app.features.documents.storage import save_document_version
import uuid

router = APIRouter()

@router.post("/upload")
def upload_syllabus(
    title: str = Form(...),
    term: TermEnum = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    if current_user.role != roleEnum.FACULTY:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only faculty can upload documents.")
    
    dept = db.query(Department).filter(Department.id == current_user.department_id).first()
    ay = db.query(AcademicYear).filter(AcademicYear.is_active == True).first()
    doc_type = db.query(DocumentType).filter(DocumentType.prefix == "SYL").first()  # Assuming "SYL" is the prefix for syllabus

    if not ay or not doc_type:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="System configuration missing: Ensure an active acaddemic year and SYL document type exist"
            )
    
    count = db.query(Document).filter(
        Document.department_id == dept.id,
        Document.academic_year_id == ay.id,
    ).count() + 1

    sequence = f"{count:03d}"
    doc_code = f"{doc_type.prefix}--{dept.code}--{sequence}"

    file_path = save_document_version(file, dept.code, doc_code, 1)

    new_doc = Document(
        id=str(uuid.uuid4()),
        document_code=doc_code,
        title=title,
        doc_type_id=doc_type.id,
        department_id=dept.id,
        academic_year_id=ay.id,
        faculty_id=current_user.id,
        term=term,
    )

    db.add(new_doc)
    db.commit()

    return {
        "message": "Syllabus uploaded successfully",
        "document_code": doc_code,
        "status": new_doc.status,
    }
