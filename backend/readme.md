# SAMCIS Paper Trail 2.0 (Backend API)

Welcome to the core backend repository for the **SAMCIS Paper Trail** system. This FastAPI application serves as the central engine for document tracking, automated approval workflows, and role-based access control for the university department.

### Current Status
* **Completed:** Phase 1 (Auth), Phase 2 (Workflow), Phase 3 (Submission Windows).
* **Next Up:** Phase 4 (Document Control Requests & Analytics Dashboards).

---

## Dev Setup
1. backend/ `python -m venv .venv`
2. source .venv/bin/activate
3. pip install -r requirements.txt
4. python seed.py (make sure sqlite is already installed)
5. backend/app/core/ create `.env` with the entries from .env.example filled out (ask for the values)
6. backend/ fastapi dev

---

## Tech Stack
* **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
* **ORM:** [SQLAlchemy](https://www.sqlalchemy.org/)
* **Database:** SQLite (Development)
* **Server:** Uvicorn
* **Data Validation:** Pydantic

---

## Architectural Philosophy

This project uses a **Domain-Driven Directory Structure**. Instead of grouping all models together and all routers together, code is grouped by *feature*. This ensures that when a developer works on "Workflow," they have everything they need in one isolated folder.

### Directory Map
```text
backend/
├── app/
│   ├── main.py                 # FastAPI application factory & router registration
│   ├── core/                   
│   │   └── database.py         # SQLAlchemy engine & session management
│   └── features/               # DOMAIN MODULES
│       ├── user_roles/         # Authentication & Access Control
│       ├── documents/          # File Management & Metadata
│       ├── workflow/           # State Machine & Audit Trails (Status/Signatures)
│       └── submission_windows/ # Academic Term Timing Controls
├── requirements.txt            # Project dependencies
└── venv/                       # (Ignored in git) Python Virtual Environment