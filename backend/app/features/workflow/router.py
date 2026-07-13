from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.features.documents.models import Document, DocumentStatus
from app.features.workflow.models import StatusLog, Signature, DecisionEnum
from app.features.user_roles.models import User, RoleEnum
# Assuming you have an auth dependency to get the current active user
from app.features.auth.dependencies import get_current_user 

router = APIRouter(prefix="/workflow", tags=["Workflow"])

# The state engine configurations
STANDARD_WORKFLOW = {
    DocumentStatus.DRAFT: DocumentStatus.PENDING_DEPT_HEAD,
    DocumentStatus.PENDING_DEPT_HEAD: DocumentStatus.PENDING_AUDIT,
    DocumentStatus.PENDING_AUDIT: DocumentStatus.PENDING_SECRETARY,
    DocumentStatus.PENDING_SECRETARY: DocumentStatus.PENDING_DEAN,
    DocumentStatus.PENDING_DEAN: DocumentStatus.PENDING_LIBRARIAN,
    DocumentStatus.PENDING_LIBRARIAN: DocumentStatus.COMPLETED
}

AFAR_WORKFLOW = {
    DocumentStatus.DRAFT: DocumentStatus.PENDING_DEPT_HEAD,
    DocumentStatus.PENDING_DEPT_HEAD: DocumentStatus.PENDING_DEAN,
    DocumentStatus.PENDING_DEAN: DocumentStatus.COMPLETED
}

def get_next_status(current_status: DocumentStatus, doc_type_prefix: str) -> DocumentStatus:
    """Calculates the progressive status based on document classification."""
    if doc_type_prefix == "AFAR":
        return AFAR_WORKFLOW.get(current_status)
    return STANDARD_WORKFLOW.get(current_status)


@router.post("/documents/{document_id}/approve")
def approve_document(
    document_id: str,
    remarks: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 1. Fetch the document
    document = db.query(Document).filter(Document.id == document_id, Document.is_deleted == False).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
        
    # 2. Extract its type prefix (assuming document.document_type.prefix exists via relationships)
    # If your model stores the raw prefix directly, adjust this line accordingly.
    doc_type_prefix = document.document_type.prefix 
    
    # 3. Calculate target status
    old_status = document.status
    next_status = get_next_status(old_status, doc_type_prefix)
    
    if not next_status:
        raise HTTPException(
            status_code=400, 
            detail=f"No valid forward transition from state: {old_status} for type {doc_type_prefix}"
        )
        
    # 4. Progress the Document State
    document.status = next_status
    
    # 5. Append to the Status Logs (State Machine History)
    status_log = StatusLog(
        document_id=document.id,
        from_status=old_status,
        to_status=next_status,
        changed_by=current_user.id,
        remarks=remarks
    )
    db.add(status_log)
    
    # 6. Record the logical Signature validation
    signature = Signature(
        document_id=document.id,
        signed_by=current_user.id,
        role=current_user.role,
        decision=DecisionEnum.APPROVED
    )
    db.add(signature)
    
    # 7. Commit atomic transactions
    db.commit()
    db.refresh(document)
    
    return {
        "message": "Document successfully approved and advanced.",
        "current_status": document.status
    }