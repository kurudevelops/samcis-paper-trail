from fastapi import HTTPException
from app.features.documents.models import DocumentStatus
from app.features.user_roles.models import RoleEnum

APPROVAL_CHAIN = {
    DocumentStatus.SUBMITTED: {
        "required_roles": RoleEnum.DEPARTMENT_HEAD,
        "next_status": DocumentStatus.DEPT_HEAD_SIGNED
    },

    DocumentStatus.DEPT_HEAD_SIGNED: {
        "required_roles": RoleEnum.SECRETARY,
        "next_status": DocumentStatus.AUDITED
    },

    DocumentStatus.AUDITED: {
        "required_roles": RoleEnum.LIBRARIAN,
        "next_status": DocumentStatus.LIBRARY_SIGNED
    },

    DocumentStatus.LIBRARY_SIGNED: {
        "required_roles": RoleEnum.ASSOCIATE_DEAN,
        "next_status": DocumentStatus.ASSOC_DEAN_SIGNED
    },

    DocumentStatus.ASSOC_DEAN_SIGNED: {
        "required_roles": RoleEnum.DEAN,
        "next_status": DocumentStatus.DEAN_APPROVED
    }
}

def validate_transition(current_status: DocumentStatus, user_role: RoleEnum, department_id: str, doc_department_id: str):
    # this will validate if the user is authorized to approve the document based on the current status and their role

    if current_status not in APPROVAL_CHAIN:
        raise HTTPException(status_code=400, detail="Unauthorized access: Waiting for {expected_step['required_role'].value} Signature")
    
    if user_role != expected_step["required_roles"]:
        raise HTTPException(
            status_code=403, 
            detail=f"Unauthorized access: Waiting for {expected_step['required_roles'].value} Signature"
            )
    
    if user_role == RoleEnum.DEPARTMENT_HEAD and department_id != doc_department_id:
        raise HTTPException(
            status_code=403, 
            detail="DEpartment heads can only sign documents from their own department"
            )
    
    return expected_step["next_status"]