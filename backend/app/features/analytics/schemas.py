class QomMetricsRequest(BaseModel):
    department_id: str
    academic_year: str
    term: str

class QomMetricsResponse(BaseModel):
    department_id: str
    academic_year: str
    term: str
    total_required_documents: int
    total_submitted_on_time: int
    compliance_rate_percentage: float
    average_approval_velocity_days: Optional[float] = None