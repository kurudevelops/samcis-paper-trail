from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
from app.features.document_control.models import DcrStatus

class DcrCreate(BaseModel):
    document_id: str
    reason: str

class DcrDecide(BaseModel):
    status: DcrStatus
    remarks: Optional[str] = None

class DcrResponse(BaseModel):
    id: str
    document_id: str
    requested_by: str
    reason: str
    status: DcrStatus
    requested_at: datetime
    decided_by: Optional[str] = None
    decided_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)