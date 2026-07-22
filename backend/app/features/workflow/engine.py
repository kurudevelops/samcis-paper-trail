from fastapi import HTTPException

from app.features.documents.models import DocumentStatus
from app.features.user_roles.models import RoleEnum

APPROVAL_CHAIN = {
    DocumentStatus.PENDING_DEPT_HEAD: {
        "required_role": RoleEnum.DEPARTMENT_HEAD,
        "next_status": DocumentStatus.PENDING_AUDIT,
    },
    DocumentStatus.PENDING_AUDIT: {
        "required_role": RoleEnum.AUDITOR,
        "next_status": DocumentStatus.PENDING_SECRETARY,
    },
    DocumentStatus.PENDING_SECRETARY: {
        "required_role": RoleEnum.SECRETARY,
        "next_status": DocumentStatus.PENDING_DEAN,
    },
    DocumentStatus.PENDING_DEAN: {
        "required_role": RoleEnum.DEAN,
        "next_status": DocumentStatus.PENDING_LIBRARIAN,
    },
    DocumentStatus.PENDING_LIBRARIAN: {
        "required_role": RoleEnum.LIBRARIAN,
        "next_status": DocumentStatus.COMPLETED,
    },
}

AFAR_CHAIN = {
    DocumentStatus.PENDING_DEPT_HEAD: {
        "required_role": RoleEnum.DEPARTMENT_HEAD,
        "next_status": DocumentStatus.PENDING_DEAN,
    },
    DocumentStatus.PENDING_DEAN: {
        "required_role": RoleEnum.DEAN,
        "next_status": DocumentStatus.COMPLETED,
    },
}

def get_approval_step(current_status: DocumentStatus, doc_type_prefix: str):
    if doc_type_prefix == "AFR":
        return AFAR_CHAIN.get(current_status)
    return APPROVAL_CHAIN.get(current_status)

def validate_transition(
    current_status: DocumentStatus,
    user_role: RoleEnum,
    department_id: str,
    doc_department_id: str,
    doc_type_prefix: str,
):
    expected_step = get_approval_step(current_status, doc_type_prefix)

    if not expected_step:
        raise HTTPException(
            status_code=400,
            detail=f"No approval step is defined for status {current_status.value}.",
        )

    if user_role != expected_step["required_role"]:
        raise HTTPException(
            status_code=403,
            detail=f"Unauthorized access: Waiting for {expected_step['required_role'].value} approval.",
        )

    if user_role == RoleEnum.DEPARTMENT_HEAD and department_id != doc_department_id:
        raise HTTPException(
            status_code=403,
            detail="Department heads can only approve documents from their own department.",
        )

    return expected_step["next_status"]