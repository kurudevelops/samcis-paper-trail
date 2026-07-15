from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.features.document_control.models import DcrStatus

class DcrCreate(BaseModel):
    document_id: str
    reason: str

class DcrDecide(BaseModel):
    status: DcrStatus
    remarks: Optional[str] = None # Optional context from the Dean

class DcrResponse(BaseModel):
    id: str
    document_id: str
    requested_by: str
    reason: str
    status: DcrStatus
    requested_at: datetime
    decided_by: Optional[str] = None
    decided_at: Optional[datetime] = None

    class Config:
        orm_mode = True