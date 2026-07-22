import uuid
from app.core.database import SessionLocal, Base, engine
from app.features.departments.models import Department
from app.features.user_roles.models import User, RoleEnum

Base.metadata.create_all(bind=engine)

def seed_departments(db):
    if db.query(Department).count() > 0:
        print("Departments are already seeded. Skipping.")
        return

    departments_seed = [
        {"id": "BAE", "code": "BAE", "name": "Business Administration Entrepreneurship"},
        {"id": "IT_MMA", "code": "IT & MMA", "name": "IT & MMA"},
        {"id": "CS_CAD", "code": "CS & CAD", "name": "CS & CAD"},
        {"id": "ACT", "code": "Accountancy", "name": "Accountancy"},
        {"id": "HTM", "code": "HTM", "name": "Hotel & Tourism Management"},
        {"id": "MATH", "code": "Math", "name": "Mathematics Department"},
    ]

    for dept in departments_seed:
        db.add(Department(id=dept["id"], name=dept["name"], code=dept["code"]))

    db.commit()
    print("Successfully seeded departments!")

def seed_test_users(db):
    if db.query(User).count() > 0:
        print("Users are already seeded. Skipping.")
        return

    test_users = [
        {
            "first_name": "Juan",
            "last_name": "Dela Cruz",
            "email": "faculty123@test.com",
            "role": RoleEnum.FACULTY,
            "department_id": "CS_CAD",
            "google_sub": "mock_google_sub_faculty123",
        },
        {
            "first_name": "Maria",
            "last_name": "Clara",
            "email": "auditor123@test.com",
            "role": RoleEnum.AUDITOR,
            "department_id": "ACT",
            "google_sub": "mock_google_sub_auditor123",
        },
        {
            "first_name": "Ana",
            "last_name": "Santos",
            "email": "secretary123@test.com",
            "role": RoleEnum.SECRETARY,
            "department_id": "BAE",
            "google_sub": "mock_google_sub_secretary123",
        },
        {
            "first_name": "hatdog",
            "last_name": "testing",
            "email": "dean123@test.com",
            "role": RoleEnum.DEAN,
            "department_id": "IT_MMA",
            "google_sub": "mock_google_sub_dean123",
        },
        {
            "first_name": "System",
            "last_name": "Admin",
            "email": "admin123@test.com",
            "role": RoleEnum.ADMINISTRATOR,
            "department_id": "BAE",
            "google_sub": "mock_google_sub_admin123",
        },
    ]

    for user_data in test_users:
        db.add(
            User(
                id=str(uuid.uuid4()),
                first_name=user_data["first_name"],
                last_name=user_data["last_name"],
                email=user_data["email"],
                role=user_data["role"],
                department_id=user_data["department_id"],
                google_sub=user_data["google_sub"],
            )
        )

    db.commit()
    print("Successfully seeded test users!")

def main():
    db = SessionLocal()
    try:
        seed_departments(db)
        seed_test_users(db)
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Starting database seeding process...")
    main()