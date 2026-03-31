HEAD
# HMIS Scaffold (Django + Next.js + PostgreSQL)

Production-oriented starter architecture for Hospital Management Information System.

## 1) Folder Structure

```text
backend/
  config/
  apps/
    common/
    accounts/
    patients/
    appointments/
    pharmacy/
    lab/
    admin_dashboard/
frontend/
  app/
  components/login/
  services/api/
  hooks/
  types/
```

## 2) ER-Style Schema Overview

- `users` (custom auth user, role-based)
- `patients` (1:1 optional link to users for patient portal)
- `appointments` (patient + provider + booked_by)
- `medication_orders` (patient medication dispensing)
- `lab_orders` (patient lab tests and results)

All major tables inherit UUID PK + `created_at` + `updated_at`.

## 3) Authentication Flow

1. Frontend sends `{ username, password, role, rememberDevice }` to `/api/auth/login`.
2. Backend validates credentials, validates role match, applies rate limiting.
3. Backend returns short-lived `access` JWT and user profile, and sets refresh token in an HTTP-only secure cookie.
4. Frontend keeps only the access token in runtime memory and redirects user by role dashboard path.
5. Protected APIs require `Authorization: Bearer <access>`.
6. Logout blacklists refresh token and clears the auth cookie.

## 4) RBAC Logic

- Role persisted in `accounts.User.role`.
- Permission classes control route-level access (`HasRole`, `IsClinicalStaff`, etc.).
- Extend to object-level permissions for department-specific access.

## 5) Scaling Roadmap

- Add Redis for cache, throttling, task queues (Celery).
- Use read replicas for reporting workloads.
- Add audit log table and immutable event stream for compliance.
- Split large domains into bounded contexts/microservices when needed.
- Add observability (OpenTelemetry, structured logs, SLO alerting).

## 6) Setup Instructions

### Backend

1. `cd backend`
2. `python -m venv .venv`
3. `.venv\\Scripts\\activate`
4. `pip install -r requirements.txt`
5. Copy `.env.example` to `.env` and set production values.
6. `python manage.py makemigrations`
7. `python manage.py migrate`
8. `python manage.py createsuperuser`
9. `python manage.py runserver`

### Frontend

1. `cd frontend`
2. `npm install`
3. Set env: `NEXT_PUBLIC_API_BASE_URL=https://api.hmis.example.com/api`
4. `npm run dev`
=======
# medical_hmis
5ae3ffcea7e9ab4e53226b543dddbb66fe6e43a2
