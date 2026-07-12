from fastapi import FastAPI
from app.core.database import engine, Base

from app.features.departments.models import Department
from app.features.users_roles.models import User
from app.features.documents.models import Document, DocumentVersion, DocumentType, AcademicYear
from app.features.documents.router import router as documents_router
from app.features.auth.routes import router as auth_router
from app.features.workflow.models import Signature, Statuslog
from app.features.workflow.router import router as workflow_router
from app.features.notifications.router import router as notifications_router
from app.features.submission_windows.models import SubmissionWindow
from app.feature.submission_windows.router import router as window_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Paper Trail 2.0 API")

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(documents_router, prefix="/api/v1/documents", tags=["Documents"])
app.include_router(workflow_router, prefix="/api/v1/workflow", tags=["Workflow"])
app.include_router(notifications_router, prefix="/api/v1/notifications", tags=["Notifications"])
app.include_router(window_router, prefix="/api/v1/submission-windows", tags=["Submission Windows"])

@app.get("/")
def read_root():
    return {"status": "Backend is running, and the database is ready!"}