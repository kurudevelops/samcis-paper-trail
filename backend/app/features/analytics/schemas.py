from pydantic import BaseModel
from typing import List, Optional

# --- DASHBOARD OVERVIEW SCHEMAS ---

class DocumentStatusCount(BaseModel):
    status: str
    count: int

class DepartmentDocumentCount(BaseModel):
    department_id: Optional[str]
    count: int

class UserRoleCount(BaseModel):
    role: str
    count: int

class DashboardStatsResponse(BaseModel):
    total_documents: int
    documents_by_status: List[DocumentStatusCount]
    documents_by_department: List[DepartmentDocumentCount]
    total_users: int
    users_by_role: List[UserRoleCount]
    active_submission_windows: int


# --- QOM ANALYTICS SCHEMAS ---

class QomMetricsRequest(BaseModel):
    department_id: str
    academic_year: str
    term: str

class QomMetricsResponse(BaseModel):
    department_id: str
    academic_year: str
    term: str
    total_required_documents: int
    total_submitted_on_time: int
    compliance_rate_percentage: float
    average_approval_velocity_days: Optional[float] = None