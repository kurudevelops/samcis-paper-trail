from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.features.submission_windows.model import SubmissionWindow
from .schemas import CalendarEvent, CalendarEventList

router = APIRouter()

@router.get("/events", response_model=CalendarEventList)
def get_calendar_events(db: Session = Depends(get_db)):
    events = []
    
    # Fetch submission windows as events
    windows = db.query(SubmissionWindow).all()
    for window in windows:
        # e.g., "PRELIM Submissions (AY2026-2027)"
        term_name = window.term.value if hasattr(window.term, "value") else str(window.term)
        title = f"{term_name} Submissions ({window.academic_year})"
        
        events.append(
            CalendarEvent(
                id=window.id,
                title=title,
                start=window.start_date,
                end=window.end_date,
                type="submission_window"
            )
        )
        
    return CalendarEventList(events=events)
