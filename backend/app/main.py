from fastapi import FastAPI
from app.core.database import engine, Base

from app.features.departments.models import Department
from app.features.users_roles.models import User


from app.features.auth.routes import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Paper Trail 2.0 API")

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])

@app.get("/")
def read_root():
    return {"status": "Backend is running, and the database is ready!"}