from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import create_access_token
from app.features.user_roles.models import User, RoleEnum
from app.features.departments.models import Department
import uuid

router = APIRouter()

SCHOOL_WIDE_ROLES = [
    RoleEnum.DEAN,
    RoleEnum.SECRETARY,
    RoleEnum.AUDITOR,
    RoleEnum.ASSOCIATE_DEAN,
    RoleEnum.LIBRARIAN,
    RoleEnum.ADMINISTRATOR,
]

@router.post("/login/google")
def google_login(token: str, db: Session = Depends(get_db)):
    if not token or token != "valid_google_token":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Google token")

    return {"message": "Google verification logic is not implemented yet. This is a placeholder response."}

@router.post("/dev-login")
def dev_login(email: str, role: RoleEnum, department_code: str | None = None, db: Session = Depends(get_db)):
    dept = None

    if role not in SCHOOL_WIDE_ROLES:
        if not department_code:
            raise HTTPException(status_code=400, detail=f"{role.value} requires a department_code")
        dept = db.query(Department).filter(Department.id == department_code).first()
        if not dept:
            raise HTTPException(status_code=404, detail="Department not found")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(
            id=str(uuid.uuid4()),
            first_name="Test",
            last_name="User",
            email=email,
            role=role,
            department_id=dept.id if dept else None,
            google_sub=f"dev_sub_{uuid.uuid4()}",
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = create_access_token(data={"sub": user.id, "role": user.role.value})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user.email,
            "role": user.role.value,
            "department": dept.id if dept else None,
        },
    }