import uuid
from app.core.database import SessionLocal, Base, engine
from app.features.departments.models import Department

# Ensure tables are created just in case
Base.metadata.create_all(bind=engine)

def seed_departments():
    db = SessionLocal()
    try:
        # Check if the database is already seeded to prevent duplicates
        if db.query(Department).count() > 0:
            print("Departments are already seeded. Skipping.")
            return

        # The 6 departments specified in the documentation
        departments_data = [
            {"name": "Computer and Information Sciences", "code": "CIS"},
            {"name": "Placeholder Department 2", "code": "DEPT2"},
            {"name": "Placeholder Department 3", "code": "DEPT3"},
            {"name": "Placeholder Department 4", "code": "DEPT4"},
            {"name": "Placeholder Department 5", "code": "DEPT5"},
            {"name": "Placeholder Department 6", "code": "DEPT6"},
        ]

        # Add each department to the database session
        for dept in departments_data:
            new_department = Department(
                id=str(uuid.uuid4()),
                name=dept["name"],
                code=dept["code"]
            )
            db.add(new_department)

        # Commit the transaction to save them to the database
        db.commit()
        print("Successfully seeded 6 departments into the database!")

    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Starting database seeding process...")
    seed_departments()