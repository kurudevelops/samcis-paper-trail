from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.features.auth.dependencies import get_current_user
from app.features.documents.models import (
    Document,
    DocumentStatus,
    DocumentVersion,
    DocumentType,
    AcademicYear,
    TermEnum,
)
from app.features.departments.models import Department
from app.features.documents.storage import save_document_version
from app.features.submission_windows.model import SubmissionWindow
from app.features.user_roles.models import User, RoleEnum
from datetime import datetime
import os
import uuid

router = APIRouter()

def can_view_document(user: User, document: Document) -> bool:
    if user.role in [RoleEnum.DEAN, RoleEnum.SECRETARY, RoleEnum.ADMINISTRATOR]:
        return True
    if user.role == RoleEnum.DEPARTMENT_HEAD:
        return user.department_id == document.department_id
    if user.role == RoleEnum.FACULTY:
        return user.id == document.faculty_id
    return False

@router.get("/types")
def list_document_types(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(DocumentType).all()

@router.post("/upload")
def upload_syllabus(
    title: str = Form(...),
    term: TermEnum = Form(...),
    window_id: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != RoleEnum.FACULTY:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only faculty can upload documents.")

    dept = db.query(Department).filter(Department.id == current_user.department_id).first()
    ay = db.query(AcademicYear).filter(AcademicYear.is_active == True).first()

    if not ay:
        raise HTTPException(status_code=400, detail="No active academic year configured.")

    window = db.query(SubmissionWindow).filter(
        SubmissionWindow.id == window_id,
        SubmissionWindow.academic_year == ay.label,
        SubmissionWindow.term == term,
        SubmissionWindow.is_active == True,
    ).first()

    if not window:
        raise HTTPException(status_code=400, detail="That submission window is not open or doesn't exist.")

    doc_type = db.query(DocumentType).filter(DocumentType.id == window.doc_type_id).first()
    if not doc_type:
        raise HTTPException(status_code=400, detail="Submission window has no valid document type configured.")

    now = datetime.utcnow()
    if not (window.start_date <= now <= window.end_date):
        raise HTTPException(
            status_code=400,
            detail=f"The submission window for {ay.label} {term.value} is not currently open.",
        )

    count = db.query(Document).filter(
        Document.department_id == dept.id,
        Document.academic_year_id == ay.id,
        Document.doc_type_id == doc_type.id,
    ).count() + 1

    sequence = f"{count:03d}"
    doc_code = f"{doc_type.prefix}-{dept.code}-{sequence}"

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
        status=DocumentStatus.PENDING_DEPT_HEAD,
        current_revision=1,
    )

    db.add(new_doc)
    db.flush()

    new_version = DocumentVersion(
        id=str(uuid.uuid4()),
        document_id=new_doc.id,
        revision_number=1,
        file_path=file_path,
        uploaded_by=current_user.id,
        change_note="Initial upload",
    )
    db.add(new_version)
    db.commit()

    return {
        "message": "Syllabus uploaded successfully",
        "document_code": doc_code,
        "status": new_doc.status,
    }

@router.get("")
def list_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(Document).filter(Document.is_deleted == False)

    if current_user.role == RoleEnum.FACULTY:
        query = query.filter(Document.faculty_id == current_user.id)
    elif current_user.role == RoleEnum.DEPARTMENT_HEAD:
        query = query.filter(Document.department_id == current_user.department_id)
    elif current_user.role in [RoleEnum.DEAN, RoleEnum.SECRETARY, RoleEnum.ADMINISTRATOR]:
        pass
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view documents.")

    documents = query.order_by(Document.created_at.desc()).all()

    return [
        {
            "id": doc.id,
            "document_code": doc.document_code,
            "title": doc.title,
            "status": doc.status,
            "term": doc.term,
            "current_revision": doc.current_revision,
            "created_at": doc.created_at,
        }
        for doc in documents
    ]

@router.get("/{document_id}/download")
def download_document(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.is_deleted == False,
    ).first()

    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    if not can_view_document(current_user, document):
        raise HTTPException(status_code=403, detail="You do not have permission to view this document.")

    latest_version = db.query(DocumentVersion).filter(
        DocumentVersion.document_id == document.id
    ).order_by(DocumentVersion.revision_number.desc()).first()

    if not latest_version:
        raise HTTPException(status_code=404, detail="No file version found for this document.")

    if not os.path.exists(latest_version.file_path):
        raise HTTPException(status_code=404, detail="Stored file no longer exists on disk.")

    filename = os.path.basename(latest_version.file_path)
    return FileResponse(
        path=latest_version.file_path,
        filename=filename,
        media_type="application/octet-stream",
    )

@router.post("/{document_id}/revise")
def revise_document(
    document_id: str,
    file: UploadFile = File(...),
    change_note: str = Form(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != RoleEnum.FACULTY:
        raise HTTPException(status_code=403, detail="Only Faculty can revise documents.")

    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found.")

    if doc.faculty_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only revise your own documents.")

    if doc.status == DocumentStatus.DEAN_APPROVED:
        raise HTTPException(
            status_code=400,
            detail="Cannot revise a fully approved document directly. An amendment request is required.",
        )

    dept = db.query(Department).filter(Department.id == doc.department_id).first()
    new_revision_number = doc.current_revision + 1
    file_path = save_document_version(file, dept.code, doc.document_code, new_revision_number)

    new_version = DocumentVersion(
        id=str(uuid.uuid4()),
        document_id=doc.id,
        revision_number=new_revision_number,
        file_path=file_path,
        uploaded_by=current_user.id,
        change_note=change_note,
    )
    db.add(new_version)
    doc.current_revision = new_revision_number

    if doc.status == DocumentStatus.REJECTED:
        doc.status = DocumentStatus.SUBMITTED

    db.commit()

    return {
        "message": "Revision uploaded successfully!",
        "document_code": doc.document_code,
        "new_revision": new_revision_number,
        "status": doc.status,
    }

@router.delete("/{document_id}")
def soft_delete_document(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found.")

    is_owner = (current_user.id == doc.faculty_id)
    is_dean = (current_user.role == RoleEnum.DEAN)

    if not (is_owner or is_dean):
        raise HTTPException(status_code=403, detail="You do not have permission to delete this document.")

    if is_owner and not is_dean:
        if doc.status not in [DocumentStatus.DRAFT, DocumentStatus.SUBMITTED, DocumentStatus.REJECTED]:
            raise HTTPException(
                status_code=400,
                detail="You can only delete your own documents if it is currently moving through the approval process",
            )

    doc.is_deleted = True
    db.commit()

    return {"message": "Document soft-deleted successfully."}