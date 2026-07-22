from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.features.auth.dependencies import get_current_user
from app.features.documents.models import Document, DocumentStatus, DocumentType
from app.features.workflow.models import StatusLog, Signature, DecisionEnum
from app.features.user_roles.models import User, RoleEnum

router = APIRouter(prefix="/workflow", tags=["Workflow"])

APPROVAL_RULES = {
    DocumentStatus.PENDING_DEPT_HEAD: RoleEnum.DEPARTMENT_HEAD,
    DocumentStatus.PENDING_AUDIT: RoleEnum.AUDITOR,
    DocumentStatus.PENDING_SECRETARY: RoleEnum.SECRETARY,
    DocumentStatus.PENDING_DEAN: RoleEnum.DEAN,
    DocumentStatus.PENDING_LIBRARIAN: RoleEnum.LIBRARIAN,
}

STANDARD_WORKFLOW = {
    DocumentStatus.PENDING_DEPT_HEAD: DocumentStatus.PENDING_AUDIT,
    DocumentStatus.PENDING_AUDIT: DocumentStatus.PENDING_SECRETARY,
    DocumentStatus.PENDING_SECRETARY: DocumentStatus.PENDING_DEAN,
    DocumentStatus.PENDING_DEAN: DocumentStatus.PENDING_LIBRARIAN,
    DocumentStatus.PENDING_LIBRARIAN: DocumentStatus.COMPLETED,
}

AFAR_WORKFLOW = {
    DocumentStatus.PENDING_DEPT_HEAD: DocumentStatus.PENDING_DEAN,
    DocumentStatus.PENDING_DEAN: DocumentStatus.COMPLETED,
}

def get_next_status(current_status: DocumentStatus, doc_type_prefix: str) -> DocumentStatus:
    if doc_type_prefix == "AFR":
        return AFAR_WORKFLOW.get(current_status)
    return STANDARD_WORKFLOW.get(current_status)

@router.post("/documents/{document_id}/approve")
def approve_document(
    document_id: str,
    remarks: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.is_deleted == False,
    ).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    required_role = APPROVAL_RULES.get(document.status)
    if not required_role:
        raise HTTPException(
            status_code=400,
            detail=f"Document in status {document.status.value} cannot be approved.",
        )

    if current_user.role != required_role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Only {required_role.value} can approve a document in {document.status.value} status.",
        )

    if current_user.role == RoleEnum.DEPARTMENT_HEAD and current_user.department_id != document.department_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Department heads can only approve documents from their own department.",
        )

    doc_type = db.query(DocumentType).filter(
        DocumentType.id == document.doc_type_id
    ).first()
    if not doc_type:
        raise HTTPException(status_code=404, detail="Document type not found.")

    next_status = get_next_status(document.status, doc_type.prefix)
    if not next_status:
        raise HTTPException(
            status_code=400,
            detail=f"No valid forward transition from state: {document.status.value} for type {doc_type.prefix}",
        )

    old_status = document.status
    document.status = next_status

    db.add(StatusLog(
        document_id=document.id,
        from_status=old_status,
        to_status=next_status,
        changed_by=current_user.id,
        remarks=remarks,
    ))

    db.add(Signature(
        document_id=document.id,
        signed_by=current_user.id,
        role=current_user.role,
        decision=DecisionEnum.APPROVED,
    ))

    db.commit()
    db.refresh(document)

    return {
        "message": "Document successfully approved and advanced.",
        "current_status": document.status,
    }