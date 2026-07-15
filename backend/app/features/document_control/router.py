from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.core.database import get_db
from app.features.document_control.models import DocumentControlRequest, DcrStatus
from app.features.document_control.schemas import DcrCreate, DcrDecide, DcrResponse
from app.features.documents.models import Document, DocumentStatus
from app.features.workflow.models import StatusLog
# from app.features.auth.dependencies import get_current_user # Uncomment when auth is active

router = APIRouter(prefix="/document-control", tags=["Document Control Requests"])

@router.post("/", response_model=DcrResponse)
def create_request(
    request_data: DcrCreate, 
    db: Session = Depends(get_db)
    # current_user = Depends(get_current_user) # Assuming user context
):
    # For now, hardcode a dummy user ID if auth isn't fully wired, otherwise use current_user.id
    requester_id = "dummy-faculty-id" 

    # Verify the document exists
    document = db.query(Document).filter(Document.id == request_data.document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    new_dcr = DocumentControlRequest(
        document_id=request_data.document_id,
        requested_by=requester_id,
        reason=request_data.reason
    )
    db.add(new_dcr)
    db.commit()
    db.refresh(new_dcr)
    return new_dcr

@router.get("/pending", response_model=list[DcrResponse])
def get_pending_requests(db: Session = Depends(get_db)):
    """Fetch all pending amendment requests for the Dean's dashboard."""
    return db.query(DocumentControlRequest).filter(DocumentControlRequest.status == DcrStatus.PENDING).all()

@router.post("/{dcr_id}/decide")
def decide_request(
    dcr_id: str, 
    decision: DcrDecide, 
    db: Session = Depends(get_db)
):
    dcr = db.query(DocumentControlRequest).filter(DocumentControlRequest.id == dcr_id).first()
    if not dcr:
        raise HTTPException(status_code=404, detail="Request not found")

    if dcr.status != DcrStatus.PENDING:
        raise HTTPException(status_code=400, detail="This request has already been decided.")

    # Apply the Dean's decision
    dcr.status = decision.status
    dcr.decided_by = "dummy-dean-id" # Replace with current_user.id
    dcr.decided_at = datetime.now(timezone.utc)

    # --- THE STATE MACHINE INTERSECTION ---
    # If approved, we must unlock the original document!
    if decision.status == DcrStatus.APPROVED:
        document = db.query(Document).filter(Document.id == dcr.document_id).first()
        old_status = document.status
        
        # Revert the document back to DRAFT so the faculty can upload a new version
        document.status = DocumentStatus.DRAFT
        
        # Log this highly privileged action in the audit trail
        audit_log = StatusLog(
            document_id=document.id,
            from_status=old_status,
            to_status=DocumentStatus.DRAFT,
            changed_by=dcr.decided_by,
            remarks=f"DCR Approved: {decision.remarks}" if decision.remarks else "Unlocked via Document Control Request"
        )
        db.add(audit_log)

    db.commit()
    return {"message": f"Request {decision.status.value}", "document_id": dcr.document_id}