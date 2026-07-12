from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import create_access_token
from app.features.user_roles.models import User, RoleEnum
from app.features.departments.models import Department
import uuid

router = APIRouter()

# TODO: in the future, use google aut library to verify the token
@router.post("/login/google")
def google_login(token: str, db: Session = Depends(get_db)):
    # For demonstration, we will just mock the verification of the token
    # In a real application, you would verify the token with Google's API
    if not token or token != "valid_google_token":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Google token")

    """
    Mock implementation for Google login | implement with the real endpoint for the frontend to worksend the google id token
    """

    # Placehodler for actual google verification
    # user_info = verify google_token(token)
    return{"message": "Google verification logic is not implemented yet. This is a placeholder response."}

@router.post("/dev-login")
def dev_login(email: str, role: RoleEnum, department_code: str, db: Session = Depends(get_db)):
    """
    Development endpoint to bypass Google Auth and instantly generate a test user and JWT.
    """
    # 1. Find the department
    dept = db.query(Department).filter(Department.code == department_code).first()
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")

    # 2. Find or create the test user
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(
            id=str(uuid.uuid4()),
            first_name="Test",
            last_name="User",
            email=email,
            role=role,
            department_id=dept.id,
            google_sub=f"dev_sub_{uuid.uuid4()}"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # 3. Generate the JWT
    access_token = create_access_token(subject=user.id, role=user.role.value)
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {
            "email": user.email,
            "role": user.role,
            "department": dept.code
        }
    }