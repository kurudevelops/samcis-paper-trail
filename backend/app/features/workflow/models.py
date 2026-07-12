from sqlalchemy import Column, String, ForeignKey, Enum as SqlEnum, DateTime
from app.core.database import Base
from app.features.users_roles.models import RoleEnum
from app.features.documents.models import DocumentStatus
from datetime import datetime

import uuid
import enum

class DecisionEnum(str, enum.Enum):
    APPROVED = "approved"
    RFA = "request_for_action"
    PENDING = "pending"

class SignatureLog(base):
    __tablename__ = "status_logs"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    from_status = Column(SqlEnum(DocumentStatus), nullable=False)
    to_status = Column(SqlEnum(DocumentStatus), nullable=False)
    changed_by = Column(String, ForeignKey("users.id"), nullable=False)
    remarks = Column(String, nullable=True)
    changed_at = Column(DateTime, default=datetime.utcnow)
    