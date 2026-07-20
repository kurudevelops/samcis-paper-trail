from annotated_types import doc
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.features.auth.dependencies import get_current_user
from app.features.documents.models import Document, DocumentStatus, DocumentVersion, DocumentType, AcademicYear, TermEnum
from app.features.departments.models import Department
from app.features.documents.storage import save_document_version
from app.features.submission_windows.model import SubmissionWindow
from app.features.user_roles.models import User, RoleEnum
from datetime import datetime
from pathlib import Path
import uuid
import shutil


router = APIRouter()

@router.get("/all-document-types")
def get_document_types(
    db: Session = Depends(get_db)
):
    documentTypes = db.query(DocumentType).all()

    if not documentTypes:
        raise HTTPException(404, "Document types not found")

    return documentTypes

@router.get("/all-academic-years")
def get_academic_years(
    db: Session = Depends(get_db)
):
    academicYears = db.query(AcademicYear).all()

    if not academicYears:
        raise HTTPException(404, "Academic years not found")

    return academicYears

@router.get("/all-documents")
def get_documents(
    db: Session = Depends(get_db)
):
    documents = db.query(
        Document,
        User.first_name,
        User.last_name,
        DocumentType.label
    ).join(
        User, Document.faculty_id == User.id
    ).join(
        DocumentType, Document.doc_type_id == DocumentType.id
    ).all()
    data = []
    for doc, fname, lname, label in documents:
        data.append({
            "documentId": doc.id,
            "documentCode": doc.document_code,
            "documentType": label,
            "uploader": f"{fname} {lname}",
            "status": doc.status,
            "currentRevision": doc.current_revision,
            "createdAt": doc.created_at            
        })
    return data;
    
@router.get("/{doc_id}/download")
async def download_document(
    doc_id: str, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    doc = db.query(DocumentVersion).filter_by(document_id=doc_id).order_by(DocumentVersion.revision_number.desc()).first();
    if not doc:
        raise HTTPException(404, "Document not found")

    file_path = settings.UPLOAD_DIR / doc.file
    if not file_path.exists():
        raise HTTPException(404, "File not found")

    return FileResponse(
        path=file_path,
        filename=doc.file,  # sets Content-Disposition so browser downloads with this name
        media_type="application/octet-stream",
    )

ALLOWED_EXTENSIONS = {".pdf", ".docx"}

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    documentType: str = Form(...),
    department: str = Form(...),
    academicYear: str = Form(...),
    term: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != RoleEnum.FACULTY:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only faculty can upload documents.")

    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(400, "Only PDF and DOCX files are allowed")

    type = db.query(DocumentType).filter_by(id=documentType).first().prefix
    ay = db.query(AcademicYear).filter_by(id=academicYear).first().label
    doc_code = f"{type}-{ay}-{term}-001" # TODO: handle versioning

    stored_filename = f"{doc_code}{ext}"
    file_path = settings.UPLOAD_DIR / stored_filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    doc = Document(
        id=str(uuid.uuid4()),
        document_code=doc_code,
        doc_type_id=documentType,
        department_id=department,
        academic_year_id=academicYear,
        faculty_id=current_user.id,
        term=term    
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    return {"id": doc.id, "filename": stored_filename}

# @router.post("/upload")
# def upload_syllabus(
#     title: str = Form(...),
#     term: TermEnum = Form(...),
#     file: UploadFile = File(...),
#     db: Session = Depends(get_db),
#     current_user = Depends(get_current_user)
# ):
    
#     if current_user.role != RoleEnum.FACULTY:
#         raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only faculty can upload documents.")
    
#     dept = db.query(Department).filter(Department.id == current_user.department_id).first()
#     ay = db.query(AcademicYear).filter(AcademicYear.is_active == True).first()
#     doc_type = db.query(DocumentType).filter(DocumentType.prefix == "SYL").first()  # Assuming "SYL" is the prefix for syllabus

#     if not ay or not doc_type:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="System configuration missing: Ensure an active acaddemic year and SYL document type exist"
#             )
    
#     window = db.query(SubmissionWindow).filter(
#         SubmissionWindow.academic_year == ay.label,
#         SubmissionWindow.term == term,
#         SubmissionWindow.is_active == True
#     ).first()

#     if not window:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="No active submission window found for the specified academic year and term."
#         )

#     now = datetime.utcnow()
#     if not (window.start_date <= now <= window.end_date):
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail=f"The submission window for {ay.label} {term.value} is not currently open. Please submit between {window.start_date} and {window.end_date}."
#         )

#     count = db.query(Document).filter(
#         Document.department_id == dept.id,
#         Document.academic_year_id == ay.id,
#     ).count() + 1

#     sequence = f"{count:03d}"
#     doc_code = f"{doc_type.prefix}--{dept.code}--{sequence}"

#     file_path = save_document_version(file, dept.code, doc_code, 1)

#     new_doc = Document(
#         id=str(uuid.uuid4()),
#         document_code=doc_code,
#         title=title,
#         doc_type_id=doc_type.id,
#         department_id=dept.id,
#         academic_year_id=ay.id,
#         faculty_id=current_user.id,
#         term=term,
#     )

#     db.add(new_doc)
#     db.commit()

#     return {
#         "message": "Syllabus uploaded successfully",
#         "document_code": doc_code,
#         "status": new_doc.status,
#     }


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