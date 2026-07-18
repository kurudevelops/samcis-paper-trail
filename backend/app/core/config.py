import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

# TODO: include separate random strings in .env for session and jwt secret keys
BASE_DIR = Path(__file__).resolve().parent
class Settings(BaseSettings):
    PROJECT_NAME: str = "samcis-paper-trail"
    PROJECT_VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    DATABASE_URL: str = f"sqlite:///{BASE_DIR / 'test.db'}"
    CLIENT_ID: str
    CLIENT_SECRET: str

    SESSION_SECRET_KEY: str = "session-super-secret-development-key-change-this"
    JWT_SECRET_KEY: str = "jwt-super-secret-development-key-change-this"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    UPLOAD_DIR: Path = BASE_DIR.parent.parent / "uploads"

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env", 
        env_file_encoding="utf-8"
    )

settings = Settings()