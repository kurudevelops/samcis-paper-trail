from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.features.auth.dependencies import get_current_user
from app.features.departments.models import Department

router = APIRouter()

@router.get("/all-departments")
def get_departments(
    db: Session = Depends(get_db)
):
    departments = db.query(Department).all()

    if not departments:
        raise HTTPException(404, "Departments not found")

    return departments