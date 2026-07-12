from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.features.auth.dependencies import get_current_user
from app.features.user_roles.models import User, RoleEnum
from app.features.submission_windows.model import SubmissionWindow
from app.features.documents.models import TermEnum
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# Pydantic schemas for request validation
class SubmissionWindowCreate(BaseModel):
    academic_year: str
    term: TermEnum
    start_date: datetime
    end_date: datetime

class SubmissionWindowUpdate(BaseModel):
    start_date: datetime = None
    end_date: datetime = None
    is_active: bool = None

def enforce_admin_roles(current_user: User = Depends(get_current_user)):
    """Utility dependency to restrict endpoints to Dean and Secretary only."""
    if current_user.role not in [RoleEnum.DEAN, RoleEnum.SECRETARY]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Only the Dean or Secretary can manage submission windows."
        )
    return current_user

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_window(
    data: SubmissionWindowCreate, 
    db: Session = Depends(get_db), 
    _ = Depends(enforce_admin_roles)
):
    # Validation: Ensure start date is before end date
    if data.start_date >= data.end_date:
        raise HTTPException(status_code=400, detail="Start date must be before the end date.")
        
    new_window = SubmissionWindow(
        academic_year=data.academic_year,
        term=data.term,
        start_date=data.start_date,
        end_date=data.end_date
    )
    db.add(new_window)
    db.commit()
    db.refresh(new_window)
    return new_window

@router.get("/")
def list_windows(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Any authenticated user can view the open submission windows."""
    return db.query(SubmissionWindow).order_by(SubmissionWindow.end_date.desc()).all()

@router.put("/{window_id}")
def update_window(
    window_id: str, 
    data: SubmissionWindowUpdate, 
    db: Session = Depends(get_db), 
    _ = Depends(enforce_admin_roles)
):
    window = db.query(SubmissionWindow).filter(SubmissionWindow.id == window_id).first()
    if not window:
        raise HTTPException(status_code=404, detail="Submission window not found.")
        
    if data.start_date is not None:
        window.start_date = data.start_date
    if data.end_date is not None:
        window.end_date = data.end_date
    if data.is_active is not None:
        window.is_active = data.is_active
        
    if window.start_date >= window.end_date:
        raise HTTPException(status_code=400, detail="Start date must be before the end date.")
        
    db.commit()
    db.refresh(window)
    return window