from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class CalendarEvent(BaseModel):
    id: str
    title: str
    start: datetime
    end: datetime
    type: str # e.g. "submission_window"
    
class CalendarEventList(BaseModel):
    events: List[CalendarEvent]
