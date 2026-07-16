from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_db
from app.features.documents.models import Document
from app.features.user_roles.models import User
from app.features.submission_windows.model import SubmissionWindow
from .schemas import (
    DashboardStatsResponse, DocumentStatusCount, 
    DepartmentDocumentCount, UserRoleCount, QomMetricsResponse
)
from .services import calculate_qom_metrics

# The router MUST be defined before any @router decorators are used
router = APIRouter()

# --- 1. GENERAL DASHBOARD METRICS ---
@router.get("/dashboard", response_model=DashboardStatsResponse)
def get_dashboard_stats(db: Session = Depends(get_db)):
    # Total Documents
    total_docs = db.query(Document).filter(
        Document.is_deleted.is_(False)
    ).count()
    
    # Documents by Status
    docs_by_status_query = db.query(
        Document.status, func.count(Document.id)
    ).filter(Document.is_deleted.is_(False)).group_by(Document.status).all()
    
    docs_by_status = [
        DocumentStatusCount(status=status.value, count=count)
        for status, count in docs_by_status_query
    ]
    
    # Documents by Department
    docs_by_dept_query = db.query(
        Document.department_id, func.count(Document.id)
    ).filter(Document.is_deleted.is_(False)).group_by(
        Document.department_id
    ).all()
    
    docs_by_department = [
        DepartmentDocumentCount(department_id=dept_id, count=count)
        for dept_id, count in docs_by_dept_query
    ]
    
    # Total Users
    total_users = db.query(User).count()
    
    # Users by Role
    users_by_role_query = db.query(
        User.role, func.count(User.id)
    ).group_by(User.role).all()
    
    users_by_role = [
        UserRoleCount(role=role.value, count=count)
        for role, count in users_by_role_query
    ]
    
    # Active Submission Windows
    active_windows_count = db.query(SubmissionWindow).count()
    
    return DashboardStatsResponse(
        total_documents=total_docs,
        documents_by_status=docs_by_status,
        documents_by_department=docs_by_department,
        total_users=total_users,
        users_by_role=users_by_role,
        active_submission_windows=active_windows_count
    )

# --- 2. QOM ANALYTICS ---
@router.get("/qom", response_model=QomMetricsResponse)
def get_quality_objective_metrics(
    department_id: str,
    academic_year: str,
    term: str,
    db: Session = Depends(get_db)
):
    """
    Calculates Quality Objective Metrics:
    - Submission Compliance Rate (%)
    - Average Approval Velocity (Days)
    """
    metrics = calculate_qom_metrics(db, department_id, academic_year, term)
    
    if not metrics:
        raise HTTPException(
            status_code=404, 
            detail="Submission window not found for the specified academic year and term."
        )
        
    total, on_time, compliance_rate, velocity = metrics

    return QomMetricsResponse(
        department_id=department_id,
        academic_year=academic_year,
        term=term,
        total_required_documents=total,
        total_submitted_on_time=on_time,
        compliance_rate_percentage=compliance_rate,
        average_approval_velocity_days=velocity
    )