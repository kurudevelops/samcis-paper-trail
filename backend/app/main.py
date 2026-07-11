from fastapi import FastAPI
from app.core.database import engine, Base

from app.features.departments.models import Department
from app.features.users_roles.models import User

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Paper Trail 2.0 API")

@app.get("/")
def read_root():
    return {"status": "Backend is running, and the database is ready!"}