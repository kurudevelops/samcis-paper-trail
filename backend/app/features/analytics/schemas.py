from pydantic import BaseModel
from typing import List, Optional

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
