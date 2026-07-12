from annotated_types import doc
from fastapi import APIRouter, Depends, HTTPException, UploadFiule, File, Form, HTTPSException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.features.auth.dependencies import get_current_user
from app.features.documents.models import Document, DocumentStatus, DocumentVersion, DocumentType, AcademicYear, TermEnum
from app.features.departments.models import Department
from app.features.documents.storage import save_document_version
from app.features.submission_windows.models import SubmissionWindow
from datetime import datetime


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
    
    if current_user.role != RoleEnum.FACULTY:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only faculty can upload documents.")
    
    dept = db.query(Department).filter(Department.id == current_user.department_id).first()
    ay = db.query(AcademicYear).filter(AcademicYear.is_active == True).first()
    doc_type = db.query(DocumentType).filter(DocumentType.prefix == "SYL").first()  # Assuming "SYL" is the prefix for syllabus

    if not ay or not doc_type:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="System configuration missing: Ensure an active acaddemic year and SYL document type exist"
            )
    
    window = db.query(SubmissionWindow).filter(
        SubmissionWindow.academic_year == ay.label,
        SubmissionWindow.term == term,
        SubmissionWindow.is_active == True
    ).first()

    if not window:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No active submission window found for the specified academic year and term."
        )

    now = datetime.utcnow()
    if not (window.start_date <= now <= window.end_date):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"The submission window for {ay.label} {term.value} is not currently open. Please submit between {window.start_date} and {window.end_date}."
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


@router.post("/{document_id}/revise")
def revise_document(
    document_id: str,
    file: UploadFile = File(...),
    change_note: str = Form(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 1. Enforce Role: Only Faculty can revise
    if current_user.role != RoleEnum.FACULTY:
        raise HTTPException(status_code=403, detail="Only Faculty can revise documents.")

    # 2. Fetch the existing document and verify ownership
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found.")
        
    if doc.faculty_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only revise your own documents.")

    # Prevent direct revision if already fully approved
    if doc.status == DocumentStatus.DEAN_APPROVED:
        raise HTTPException(
            status_code=400, 
            detail="Cannot revise a fully approved document directly. An amendment request is required."
        )

    # 3. Get Department to construct the exact file path
    dept = db.query(Department).filter(Department.id == doc.department_id).first()

    # 4. Increment the revision number
    new_revision_number = doc.current_revision + 1

    # 5. Save the new file to local disk (e.g., SYL-CIS-001-R2.pdf)
    file_path = save_document_version(file, dept.code, doc.document_code, new_revision_number)

    # 6. Log the new version in the database
    new_version = DocumentVersion(
        id=str(uuid.uuid4()),
        document_id=doc.id,
        revision_number=new_revision_number,
        file_path=file_path,
        uploaded_by=current_user.id,
        change_note=change_note
    )
    db.add(new_version)

    # 7. Update the main Document record
    doc.current_revision = new_revision_number
    
    # 8. Workflow Integration: If it was fully rejected, restart the chain
    if doc.status == DocumentStatus.REJECTED:
        doc.status = DocumentStatus.SUBMITTED

    db.commit()

    return {
        "message": "Revision uploaded successfully!", 
        "document_code": doc.document_code, 
        "new_revision": new_revision_number,
        "status": doc.status
    }

@router.delete("/{document_id}")
def soft_delete_document(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 1. Fetch the document
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found.")

    is_owner = (current_user.id == doc.faculty_id)
    is_dean = (current_user.role == RoleEnum.DEAN)

    if not (is_owner or is_dean):
        raise HTTPException(status_code=403, detail="You do not have permission to delete this document.")
    
    if is_owner and not is_dean:
        if doc.status not in [DocumentStatus.DRAFT,DocumentStatus.SUBMITTED ,DocumentStatus.REJECTED]:
            raise HTTPException(
                status_code=400, 
                detail="You can only delete your own documents if it is currently moving through the approval process"
            )

    # 3. Soft delete by setting is_deleted to True
    doc.is_deleted = True
    db.commit()

    return {"message": "Document soft-deleted successfully."}