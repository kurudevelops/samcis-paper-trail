from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_db
from app.features.documents.models import Document, DocumentStatus
from app.features.user_roles.models import User, RoleEnum
from app.features.submission_windows.model import SubmissionWindow
from .schemas import DashboardStatsResponse, DocumentStatusCount, DepartmentDocumentCount, UserRoleCount

router = APIRouter()

@router.get("/dashboard", response_model=DashboardStatsResponse)
def get_dashboard_stats(db: Session = Depends(get_db)):
    # 1. Total Documents
    total_docs = db.query(Document).filter(Document.is_deleted == False).count()
    
    # 2. Documents by Status
    docs_by_status_query = db.query(
        Document.status, func.count(Document.id)
    ).filter(Document.is_deleted == False).group_by(Document.status).all()
    
    docs_by_status = [
        DocumentStatusCount(status=status.value, count=count)
        for status, count in docs_by_status_query
    ]
    
    # 3. Documents by Department
    docs_by_dept_query = db.query(
        Document.department_id, func.count(Document.id)
    ).filter(Document.is_deleted == False).group_by(Document.department_id).all()
    
    docs_by_department = [
        DepartmentDocumentCount(department_id=dept_id, count=count)
        for dept_id, count in docs_by_dept_query
    ]
    
    # 4. Total Users
    total_users = db.query(User).count()
    
    # 5. Users by Role
    users_by_role_query = db.query(
        User.role, func.count(User.id)
    ).group_by(User.role).all()
    
    users_by_role = [
        UserRoleCount(role=role.value, count=count)
        for role, count in users_by_role_query
    ]
    
    # 6. Active Submission Windows
    active_windows_count = db.query(SubmissionWindow).filter(SubmissionWindow.is_active == True).count()
    
    return DashboardStatsResponse(
        total_documents=total_docs,
        documents_by_status=docs_by_status,
        documents_by_department=docs_by_department,
        total_users=total_users,
        users_by_role=users_by_role,
        active_submission_windows=active_windows_count
    )
