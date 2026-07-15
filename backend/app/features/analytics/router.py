from fastapi import HTTPException
from .schemas import QomMetricsResponse
from .services import calculate_qom_metrics # Import the service you just built

@router.get("/qom", response_model=QomMetricsResponse)
def get_quality_objective_metrics(
    department_id: str,
    academic_year: str,
    term: str,
    db: Session = Depends(get_db)
):
    """
    Calculates Phase 4 Quality Objective Metrics:
    - Submission Compliance Rate (%)
    - Average Approval Velocity (Days)
    """
    metrics = calculate_qom_metrics(db, department_id, academic_year, term)
    
    if not metrics:
        raise HTTPException(
            status_code=404, 
            detail="Submission window not found for the specified academic year and term."
        )
        
    total, on_time, compliance_rate, velocity = metrics

    return QomMetricsResponse(
        department_id=department_id,
        academic_year=academic_year,
        term=term,
        total_required_documents=total,
        total_submitted_on_time=on_time,
        compliance_rate_percentage=compliance_rate,
        average_approval_velocity_days=velocity
    )