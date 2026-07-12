from sqlalchemy.orm import Session
from app.features.notifications.models import Notification
from app.features.documents.models import Document, DocumentStatus
from app.features.users_roles.models import User, RoleEnum
import uuid

def send_notification(db: Session, target_user_id: str, document_id: str, message: str):
    """Creates a single notification record."""
    new_alert = Notification(
        id=str(uuid.uuid4()),
        user_id=target_user_id,
        document_id=document_id,
        message=message
    )
    db.add(new_alert)
    db.commit()

def trigger_workflow_alerts(db: Session, doc: Document):
    """
    Determines who needs to be notified based on the document's new status.
    Always alerts the Faculty, and conditionally alerts the next reviewer in the chain.
    """
    # 1. Alert the Faculty owner
    faculty_msg = f"Your document '{doc.document_code}' has moved to status: {doc.status.value}"
    send_notification(db, doc.faculty_id, doc.id, faculty_msg)

    # 2. Map the new status to the NEXT required role
    role_to_notify_map = {
        DocumentStatus.SUBMITTED: RoleEnum.DEPARTMENT_HEAD,
        DocumentStatus.DEPT_HEAD_SIGNED: RoleEnum.SECRETARY,
        DocumentStatus.AUDITED: RoleEnum.LIBRARIAN,
        DocumentStatus.LIBRARY_SIGNED: RoleEnum.ASSOCIATE_DEAN,
        DocumentStatus.ASSOC_DEAN_SIGNED: RoleEnum.DEAN,
    }

    target_role = role_to_notify_map.get(doc.status)
    
    if target_role:
        # Find the specific user(s) who hold this role
        query = db.query(User).filter(User.role == target_role)
        
        # If the next role is Dept Head, restrict the alert to the specific department
        if target_role == RoleEnum.DEPARTMENT_HEAD:
            query = query.filter(User.department_id == doc.department_id)
            
        target_users = query.all()
        for user in target_users:
            reviewer_msg = f"Document '{doc.document_code}' is now awaiting your review."
            send_notification(db, user.id, doc.id, reviewer_msg)