from sqlalchemy import Column, String
from app.core.database import Base
import uuid

class Department(Base):
    __tablename__ = "departments"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    code = Column(String, nullable=False, unique=True)