from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime

from app.core.database import get_db
from app.features.auth.dependencies import get_current_user
from app.features.user_roles.models import User, RoleEnum
from app.features.submission_windows.model import SubmissionWindow
from app.features.documents.models import TermEnum
from app.features.documents.models import DocumentType
from app.features.documents.models import AcademicYear

router = APIRouter()

class SubmissionWindowCreate(BaseModel):
    doc_type_id: str
    academic_year: str
    term: TermEnum
    start_date: datetime
    end_date: datetime
    is_active: bool = True

class SubmissionWindowUpdate(BaseModel):
    doc_type_id: str | None = None
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
        SubmissionWindow.doc_type_id == data.doc_type_id,   # <-- ADD THIS LINE (a dept can now have separate windows per doc type)
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="A submission window already exists for this academic year, term, and document type.",
        )

    new_window = SubmissionWindow(
        doc_type_id=data.doc_type_id,
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
    academic_year: str | None = None,   # <-- ADD THIS PARAM
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(SubmissionWindow)

    if academic_year == "active":
        active_year = db.query(AcademicYear).filter(AcademicYear.is_active == True).first()
        if not active_year:
            return []
        query = query.filter(SubmissionWindow.academic_year == active_year.label)
    elif academic_year:
        query = query.filter(SubmissionWindow.academic_year == academic_year)

    windows = query.order_by(SubmissionWindow.end_date.desc()).all()
    return [_serialize_window(w, db) for w in windows]

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
    if data.doc_type_id is not None:
        window.doc_type_id = data.doc_type_id

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

def _serialize_window(window: SubmissionWindow, db: Session):
    doc_type = db.query(DocumentType).filter(DocumentType.id == window.doc_type_id).first()
    return {
        "id": window.id,
        "doc_type_id": window.doc_type_id,
        "doc_type_prefix": doc_type.prefix if doc_type else None,
        "doc_type_label": doc_type.label if doc_type else None,
        "academic_year": window.academic_year,
        "term": window.term,
        "start_date": window.start_date,
        "end_date": window.end_date,
        "is_active": window.is_active,
    }