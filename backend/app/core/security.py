from datetime import datetime, timedelta
from jose import jwt
from app.core.config import settings

def create_access_token(
    data: dict,
    secret_key: str = None,
    algorithm: str = None,
    expires_delta: timedelta = None,
):
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    to_encode = data.copy()
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        secret_key or settings.SECRET_KEY,
        algorithm=algorithm or settings.ALGORITHM,
    )
    return encoded_jwt