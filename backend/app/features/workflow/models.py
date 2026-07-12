from sqlalchemy import Column, String, ForeignKey, Enum as SqlEnum, DateTime
from app.core.database import Base
from app.features.user_roles.models import RoleEnum
from app.features.documents.models import DocumentStatus
from datetime import datetime, timezone
import uuid
import enum

class DecisionEnum(str, enum.Enum):
    APPROVED = "approved"
    RFA = "request_for_action"
    PENDING = "pending"

class StatusLog(Base):
    """Tracks the state machine transitions of a document."""
    __tablename__ = "status_logs"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    from_status = Column(SqlEnum(DocumentStatus), nullable=False)
    to_status = Column(SqlEnum(DocumentStatus), nullable=False)
    changed_by = Column(String, ForeignKey("users.id"), nullable=False)
    remarks = Column(String, nullable=True)
    # Using timezone-aware datetime for better data integrity
    changed_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class Signature(Base):
    """Tracks the actual approval decisions made by faculty/admins."""
    __tablename__ = "signatures"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    signed_by = Column(String, ForeignKey("users.id"), nullable=False)
    role = Column(SqlEnum(RoleEnum), nullable=False)
    decision = Column(SqlEnum(DecisionEnum), default=DecisionEnum.PENDING, nullable=False)
    # Using timezone-aware datetime
    signed_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))