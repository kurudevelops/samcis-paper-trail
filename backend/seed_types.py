from app.core.database import SessionLocal, engine, Base

# Import ALL related models so SQLAlchemy sees the whole web of relationships
from app.features.user_roles.models import User
from app.features.departments.models import Department # <-- Placed correctly!
from app.features.documents.models import DocumentType, Document, DocumentVersion

def seed_document_types():
    # 1. Force the database to generate any missing tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    types = [
        {"prefix": "SYL", "label": "Syllabus"},
        {"prefix": "EXM", "label": "Exam"},
        {"prefix": "AFR", "label": "AFAR"},
        {"prefix": "STA", "label": "Statistics"}
    ]
    
    for t in types:
        existing = db.query(DocumentType).filter(DocumentType.prefix == t["prefix"]).first()
        if not existing:
            new_type = DocumentType(prefix=t["prefix"], label=t["label"])
            db.add(new_type)
            print(f"Added Document Type: {t['label']} ({t['prefix']})")
            
    db.commit()
    db.close()
    print("Document types seeded successfully.")

if __name__ == "__main__":
    seed_document_types()