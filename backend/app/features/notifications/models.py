from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from app.core.database import Base
from datetime import datetime, timezone
import uuid

class Notification(Base):
    """Tracks system notifications sent to users."""
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    message = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
