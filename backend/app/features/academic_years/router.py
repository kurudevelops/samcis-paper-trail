# backend/app/features/academic_years/router.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.features.auth.dependencies import get_current_user
from app.features.documents.models import AcademicYear
from app.features.user_roles.models import User, RoleEnum
from pydantic import BaseModel

router = APIRouter()

class AcademicYearCreate(BaseModel):
    label: str
    is_active: bool = False

@router.get("/active")
def get_active_year(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    year = db.query(AcademicYear).filter(AcademicYear.is_active == True).first()
    if not year:
        raise HTTPException(status_code=404, detail="No active academic year is set.")
    return year

@router.get("/")
def list_years(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(AcademicYear).order_by(AcademicYear.label.desc()).all()

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_year(data: AcademicYearCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role not in [RoleEnum.DEAN, RoleEnum.ADMINISTRATOR]:
        raise HTTPException(status_code=403, detail="Only Dean or Admin can manage academic years.")
    new_year = AcademicYear(label=data.label, is_active=data.is_active)
    db.add(new_year)
    db.commit()
    db.refresh(new_year)
    return new_year

@router.put("/{year_id}/activate")
def activate_year(year_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role not in [RoleEnum.DEAN, RoleEnum.ADMINISTRATOR]:
        raise HTTPException(status_code=403, detail="Only Dean or Admin can manage academic years.")
    # only one AY can be active at a time
    db.query(AcademicYear).update({AcademicYear.is_active: False})
    year = db.query(AcademicYear).filter(AcademicYear.id == year_id).first()
    if not year:
        raise HTTPException(status_code=404, detail="Academic year not found.")
    year.is_active = True
    db.commit()
    db.refresh(year)
    return year