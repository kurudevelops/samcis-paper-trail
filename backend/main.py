from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
<<<<<<< HEAD

=======
>>>>>>> main
from app.core.database import engine, Base

from app.features.departments.models import Department
from app.features.user_roles.models import User
from app.features.documents.models import Document, DocumentVersion, DocumentType, AcademicYear
from app.features.documents.router import router as documents_router
from app.features.auth.router import router as auth_router
from app.features.workflow.models import Signature, StatusLog
from app.features.workflow.router import router as workflow_router
from app.features.notifications.router import router as notifications_router
from app.features.submission_windows.model import SubmissionWindow
from app.features.submission_windows.router import router as window_router
from app.features.analytics.router import router as analytics_router
from app.features.calendar.router import router as calendar_router
from app.features.document_control.router import router as dcr_router

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Paper Trail 2.0 API")

origins = [
    "http://localhost:5173" # Default port for Vite frontend (change/add as needed)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(documents_router, prefix="/api/v1/documents", tags=["Documents"])
app.include_router(workflow_router, prefix="/api/v1/workflow", tags=["Workflow"])
app.include_router(notifications_router, prefix="/api/v1/notifications", tags=["Notifications"])
app.include_router(window_router, prefix="/api/v1/submission-windows", tags=["Submission Windows"])
app.include_router(analytics_router, prefix="/api/v1/analytics", tags=["Analytics Dashboard"])
app.include_router(calendar_router, prefix="/api/v1/calendar", tags=["Calendar Integration"])
app.include_router(dcr_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"status": "Backend is running, and the database is ready!"}