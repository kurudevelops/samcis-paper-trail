from sqlalchemy import Column, String, ForeignKey, Enum as SQLEnum
from app.core.database import Base
import uuid
import enum

class RoleEnum(str, enum.Enum):
    FACULTY = "faculty"
    DEPARTMENT_HEAD = "department_head"
    AUDITOR = "auditor"
    SECRETARY = "secretary"
    DEAN = "dean"
    LIBRARIAN = "librarian"
    ASSOCIATE_DEAN = "associate_dean"
    ADMINISTRATOR = "administrator"

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    role = Column(SQLEnum(RoleEnum), nullable=False)
    department_id = Column(String, ForeignKey("departments.id"))
    google_sub = Column(String, unique=True, index=True)