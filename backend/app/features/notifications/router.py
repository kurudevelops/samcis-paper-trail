from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.features.auth.dependencies import get_current_user
from app.features.users_roles.models import User
from app.features.notifications.models import Notification

router = APIRouter()

@router.get("/")
def get_my_notifications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    alerts = db.query(Notification).filter(
        Notification.user_id == current_user.id
    ).order_by(Notification.created_at.desc()).all()
    return alerts

@router.put("/{notification_id}/read")
def mark_as_read(notification_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    alert = db.query(Notification).filter(Notification.id == notification_id).first()
    if not alert or alert.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Notification not found")
        
    alert.is_read = True
    db.commit()
    return {"message": "Notification marked as read."}