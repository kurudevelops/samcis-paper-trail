from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, enum as SQLEnum
from sqlalchemy.orm import relationship
from app.core.database import Base
from datatime import datatime
import uuid
import enum

class TermEnum(str, enum.Enum):
    PRELIM = "Prelim"
    MIDTERM = "Midterm"
    Finals = "Finals"

class DocumentStatus(str,enum.Enum):
    DRAFT = "Draft"
    SUBMITTED = "Submitted"
    DEPT_HEAD_SIGNED = "Department_Head_Signed"
    AUDITED = "Audited"
    LIBRARY_SIGNED = "Library_Signed"
    ASSOC_DEAN_SIGNED = "Assoc_Dean_Signed"
    DEAN_APPROVED = "Dean_Approved"
    REJECTED = "Rejected"

class DocumentType(Base):
    __tablename__ = "document_types"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    prefix = Column(String, nullable=False, unique=True) # this is the prefix for the document type, like SYL for syllabus, EXM for exams etc
    label = Column(String, nullable=False) # this are if its like a Syllabus, exams etc

class AcademicYear(Base):
    __tablename__ = "academic_years"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    label = Column(String, nullable=False, unique=True) # this is the label for the academic year, like 2023-2024, 2024-2025 etc
    is_active = Column(Boolean, default=False) # this is to indicate if the academic year is active or not

class Document(Base):
    __tablename__ = "documents"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    document_code = Column(String, nullable=False, unique=True) # this is the unique code for the document, like SYL-2023-2024-PRELIM-001

    # Foreign keys
    doc_type_id = Column(String, ForeignKey("document_types.id"))
    department_id = Column(String, ForeignKey("departments.id"))
    academic_year_id = Column(String, ForeignKey("academic_years.id"))
    faculty_id = Column(String, ForeignKey("users.id")) # this is the user id of the faculty who submitted the document

    term = Column(SQLEnum(TermEnum), nullable=False)
    status = Column(SQLEnum(DocumentStatus), default=DocumentStatus.DRAFT)
    current_revision = Column(Integer, default=1)
    is_original_copy_signed = Column(Boolean, default=False) # this is to indicate if the original copy of the document is signed or not

    created_at = Column(datime, default=datime.utcnow)


class DocumentVersion(Base):
    __tablename__ = "document_versions"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String, ForeignKey("documents.id"))
    revision_number = Column(Integer, nullable=False)
    file_path = Column(String, nullable=False) # this is the path to the file in the storage
    uploaded_by = Column(String, ForeignKey("users.id")) # this is the user id of the faculty who uploaded the document
    uploaded_at = Column(datime, default=datime.utcnow)

    