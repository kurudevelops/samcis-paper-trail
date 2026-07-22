from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime

from app.core.database import get_db
from app.features.auth.dependencies import get_current_user
from app.features.user_roles.models import User, RoleEnum
from app.features.submission_windows.model import SubmissionWindow
from app.features.documents.models import TermEnum

router = APIRouter()

class SubmissionWindowCreate(BaseModel):
    academic_year: str
    term: TermEnum
    start_date: datetime
    end_date: datetime
    is_active: bool = True

class SubmissionWindowUpdate(BaseModel):
    academic_year: str | None = None
    term: TermEnum | None = None
    start_date: datetime | None = None
    end_date: datetime | None = None
    is_active: bool | None = None

def enforce_admin_roles(current_user: User = Depends(get_current_user)):
    if current_user.role not in [RoleEnum.DEAN, RoleEnum.ADMINISTRATOR]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Only the Dean or Admin can manage submission windows.",
        )
    return current_user

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_window(
    data: SubmissionWindowCreate,
    db: Session = Depends(get_db),
    _ = Depends(enforce_admin_roles),
):
    if data.start_date >= data.end_date:
        raise HTTPException(status_code=400, detail="Start date must be before the end date.")

    existing = db.query(SubmissionWindow).filter(
        SubmissionWindow.academic_year == data.academic_year,
        SubmissionWindow.term == data.term,
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="A submission window already exists for this academic year and term.",
        )

    new_window = SubmissionWindow(
        academic_year=data.academic_year,
        term=data.term,
        start_date=data.start_date,
        end_date=data.end_date,
        is_active=data.is_active,
    )
    db.add(new_window)
    db.commit()
    db.refresh(new_window)
    return new_window

@router.get("/")
def list_windows(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(SubmissionWindow).order_by(SubmissionWindow.end_date.desc()).all()

@router.get("/{window_id}")
def get_window(
    window_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    window = db.query(SubmissionWindow).filter(SubmissionWindow.id == window_id).first()
    if not window:
        raise HTTPException(status_code=404, detail="Submission window not found.")
    return window

@router.put("/{window_id}")
def update_window(
    window_id: str,
    data: SubmissionWindowUpdate,
    db: Session = Depends(get_db),
    _ = Depends(enforce_admin_roles),
):
    window = db.query(SubmissionWindow).filter(SubmissionWindow.id == window_id).first()
    if not window:
        raise HTTPException(status_code=404, detail="Submission window not found.")

    if data.academic_year is not None:
        window.academic_year = data.academic_year
    if data.term is not None:
        window.term = data.term
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

@router.delete("/{window_id}")
def delete_window(
    window_id: str,
    db: Session = Depends(get_db),
    _ = Depends(enforce_admin_roles),
):
    window = db.query(SubmissionWindow).filter(SubmissionWindow.id == window_id).first()
    if not window:
        raise HTTPException(status_code=404, detail="Submission window not found.")

    db.delete(window)
    db.commit()
    return {"message": "Submission window deleted successfully."}