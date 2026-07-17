from authlib.integrations.starlette_client import OAuth
from fastapi import FastAPI, Request, APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.core.security import create_access_token
from app.features.user_roles.models import User, RoleEnum
from app.features.departments.models import Department
from app.features.auth.dependencies import get_current_user
import uuid


router = APIRouter()

oauth = OAuth()
oauth.register(
    name='google',
    client_id=settings.CLIENT_ID,
    client_secret=settings.CLIENT_SECRET,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

@router.get('/me')
async def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
    }

@router.get('/login/google')
async def login(request: Request):
    redirect_uri = 'http://localhost:8000/api/v1/auth/callback/google'
    return await oauth.google.authorize_redirect(request, redirect_uri, hd='slu.edu.ph')

@router.get('/callback/google')
async def callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    user_info = token['userinfo'] # email, name, picture, sub (google id)
    
    if user_info.get('hd') != 'slu.edu.ph':
        return RedirectResponse(url='http://localhost:5173/login?error=domain_not_allowed')

    # look up user
    user = db.query(User).filter(User.email == user_info['email']).first()

    # if not user: # reject if user isn't on the db
    #     return RedirectResponse(url='http://localhost:5173/login?error=user_not_registered')
    if not user: # create new user on sign in for the time being
        user = User(
            email=user_info['email'],
            first_name=user_info['given_name'],
            last_name=user_info['family_name']
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # issue JWT token & redirect to home page
    jwt_token = create_access_token({"sub": str(user.id), "email": user.email})
    response = RedirectResponse(url='http://localhost:5173')
    response.set_cookie(
        'session_token', jwt_token,
        httponly=True, secure=False,
        samesite='lax', max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

    return response

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