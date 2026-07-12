from datetime import datetime, timedelta
from jose import jwt
from app.core.config import settings


def create_access_token(data: dict, secret_key: str, algorithm: str, expires_delta: timedelta = None):
    """Create a JWT access token with the given data, secret key, algorithm, and expiration time."""
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "role": role,
    }

    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt