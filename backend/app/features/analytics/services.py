from sqlalchemy.orm import Session
from sqlalchemy import func
from app.features.documents.models import Document, DocumentVersion, DocumentStatus
from app.features.submission_windows.model import SubmissionWindow
from app.features.workflow.models import StatusLog

def calculate_qom_metrics(db: Session, department_id: str, academic_year: str, term: str):
    # 1. Fetch the target Submission Window deadline
    window = db.query(SubmissionWindow).filter(
        SubmissionWindow.academic_year == academic_year,
        SubmissionWindow.term == term
    ).first()

    if not window:
        return None

    # 2. Total documents expected for this department, term, and year
    total_docs_query = db.query(Document).filter(
        Document.department_id == department_id,
        Document.academic_year_id == academic_year,
        Document.term == term,
        Document.is_deleted == False
    )
    total_required = total_docs_query.count()

    if total_required == 0:
        return 0, 0, 0.0, 0.0

    # 3. Calculate Compliance Rate (Uploaded before window.end_date)
    on_time_count = db.query(Document).join(DocumentVersion).filter(
        Document.department_id == department_id,
        Document.academic_year_id == academic_year,
        Document.term == term,
        Document.is_deleted == False,
        DocumentVersion.revision_number == 1,
        DocumentVersion.uploaded_at <= window.end_date
    ).count()

    compliance_rate = round((on_time_count / total_required) * 100, 2)

    # 4. Calculate Approval Velocity (Days from upload to COMPLETED)
    # Fetch all completed documents for this scope
    completed_docs = total_docs_query.filter(Document.status == DocumentStatus.COMPLETED).all()
    
    total_velocity_days = 0.0
    valid_velocity_docs = 0

    for doc in completed_docs:
        # Get the initial upload time
        first_version = db.query(DocumentVersion).filter(
            DocumentVersion.document_id == doc.id,
            DocumentVersion.revision_number == 1
        ).first()

        # Get the timestamp when it reached COMPLETED status
        completion_log = db.query(StatusLog).filter(
            StatusLog.document_id == doc.id,
            StatusLog.to_status == DocumentStatus.COMPLETED
        ).order_by(StatusLog.changed_at.desc()).first()

        if first_version and completion_log:
            # Calculate duration in days
            time_diff = completion_log.changed_at - first_version.uploaded_at
            total_velocity_days += time_diff.total_seconds() / (24 * 3600)
            valid_velocity_docs += 1

    average_velocity = round(total_velocity_days / valid_velocity_docs, 2) if valid_velocity_docs > 0 else None

    return total_required, on_time_count, compliance_rate, average_velocity