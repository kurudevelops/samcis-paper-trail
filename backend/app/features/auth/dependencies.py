from fastapi import Depends, HTTPException, status, Cookie
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from app.core.database import get_db
from app.core.config import settings
from app.features.user_roles.models import User


# Route protection
def get_current_user(session_token: str = Cookie(None), db: Session = Depends(get_db)):
    if not session_token:
        raise HTTPException(401, "Not authenticated")
    try:
        payload = jwt.decode(session_token, settings.JWT_SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
    except JWTError:
        raise HTTPException(401, "Invalid token")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(401, "User not found")
    return user