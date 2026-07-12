from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db

from app.features.auth.dependencies import get_current_user
from app.features.user_roles.models import User
from app.features.documents.models import Document, DocumentStatus
from app.features.workflow.models import Signature, StatusLog, DecisionEnum
from app.features.workflow.engine import validate_transition
from app.features.notifications.service import trigger_workflow_alerts

import uuid

router = APIRouter()

@router.post("/{document_id}/review")
def review_document(
    document_id: str, 
    decision: DecisionEnum, 
    remarks: str = None, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):

    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    old_status = doc.status

    try:
        expected_next_status = validate_transition(
            current_status=old_status, 
            user_role=current_user.role, 
            department_id=current_user.department_id, 
            doc_department_id=doc.department_id
        )
    except HTTPException as e:
        raise e

    if decision == DecisionEnum.APPROVED:
        doc.status = expected_next_status
        if doc.status == DocumentStatus.DEAN_APPROVED:
            doc.is_original_copy_signed = True


    elif decision == DecisionEnum.RFA:
        if not remarks:
            raise HTTPException(status_code=400, detail="Remarks are required for Request for Action (RFA)")
        
    elif decision == DecisionEnum.REJECT:
        if not remarks:
            raise HTTPException(status_code=400, detail="Remarks are required for rejection")
        doc.status = DocumentStatus.REJECTED

    new_signature = Signature(
        id=str(uuid.uuid4()),
        document_id=doc.id,
        
        signer_id=current_user.id,
        signer_role=current_user.role,

        decision=decision,
        remarks=remarks
    )

    db.add(new_signature)

    new_log = StatusLog(
        id=str(uuid.uuid4()),
        document_id=doc.id,
        from_status=old_status,
        to_status=doc.status,
        changed_by=current_user.id,
        remarks=remarks
    )
    db.add(new_log)

    db.commit()

    trigger_workflow_alerts(db, doc)
    
    return {
        "message": f"Document {decision.value} successfully", 
        "new_status": doc.status
    }