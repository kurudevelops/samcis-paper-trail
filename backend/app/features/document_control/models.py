import enum
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base
import uuid

class DcrStatus(str, enum.Enum):
    PENDING = "Pending"
    APPROVED = "Approved"
    REJECTED = "Rejected"

class DocumentControlRequest(Base):
    __tablename__ = "document_control_requests"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    requested_by = Column(String, ForeignKey("users.id"), nullable=False)
    
    # The justification for why they need to unlock an approved document
    reason = Column(Text, nullable=False)
    
    status = Column(Enum(DcrStatus), default=DcrStatus.PENDING, nullable=False)
    
    requested_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    # Audit trail for the Dean's decision
    decided_by = Column(String, ForeignKey("users.id"), nullable=True)
    decided_at = Column(DateTime, nullable=True)

    # Relationships
    document = relationship("Document", back_populates="control_requests")
    requester = relationship("User", foreign_keys=[requested_by])
    decider = relationship("User", foreign_keys=[decided_by])