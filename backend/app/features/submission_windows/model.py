from sqlalchemy import Column, String, Boolean, DateTime, Enum as SQLEnum, ForeignKey
from app.core.database import Base
from app.features.documents.models import TermEnum
from datetime import datetime
import uuid

class SubmissionWindow(Base):
    __tablename__ = "submission_windows"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    doc_type_id = Column(String, ForeignKey("document_types.id"), nullable=False)  # <-- ADD THIS LINE
    academic_year = Column(String, nullable=False)
    term = Column(SQLEnum(TermEnum), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)