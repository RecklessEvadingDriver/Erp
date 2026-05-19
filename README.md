# ERP Portal for Coaching Classes

Production-ready full-stack SaaS ERP portal with role-based workflows for coaching institutes.

## Tech Stack

- **Frontend:** React + Vite + TailwindCSS + Recharts + Socket.IO client
- **Backend:** Node.js + Express.js + MongoDB Atlas (Mongoose)
- **Auth:** JWT + Role Based Access Control
- **Uploads:** Multer + Cloudinary
- **Realtime:** Socket.IO
- **Deployment:** Heroku + Docker

## Roles

- Super Admin
- Admin
- Teacher
- Student
- Parent
- Accountant

## Implemented Core Modules

- Authentication system (register/login/profile)
- RBAC middleware
- Student management APIs + UI table/filter/search
- Teacher management APIs
- Attendance APIs with QR flag + realtime events
- Fees + online payment API endpoint
- Notifications APIs + UI dropdown
- Study material upload API (Multer + Cloudinary)
- Dashboard analytics cards + professional chart
- Multi-branch dashboard support
- AI assistant page (extensible chatbot shell)
- Activity logs model + request activity persistence
- Dark/light mode and responsive SaaS layout
- PWA basics (manifest + service worker)

## Project Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── data/
├── Procfile
├── runtime.txt
├── app.json
├── Dockerfile
└── docker-compose.yml
```

## Database Models

`User, Student, Teacher, Parent, Course, Batch, Attendance, Fee, Exam, Result, Assignment, Notification, Payment, Expense, Timetable, Log`

## API Overview

Base URL: `/api`

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/profile`
- `GET/POST /students`
- `GET/POST /teachers`
- `GET/POST /attendance`
- `GET/POST /fees`
- `POST /fees/pay`
- `GET /dashboard`
- `GET/POST /notifications`
- `POST /uploads/material`
- `GET /docs`

## Installation

### 1) Clone and install

```bash
git clone https://github.com/RecklessEvadingDriver/Erp.git
cd Erp
cp .env.example .env
cp frontend/.env.example frontend/.env
npm install
```

### 2) Run locally

Terminal A:
```bash
npm run dev:backend
```

Terminal B:
```bash
npm run dev:frontend
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

## Environment Variables Guide

Use `.env` at root or `backend/.env`:

- `NODE_ENV`
- `PORT`
- `MONGO_URI` (MongoDB Atlas)
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_URL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Frontend (`frontend/.env`):

- `VITE_API_URL`
- `VITE_SOCKET_URL`

## Docker Support

```bash
docker compose up --build
```

## Heroku Deployment (Complete)

### Included Files

- `Procfile`
- `runtime.txt`
- `app.json`
- Heroku-ready build/start scripts

### Buildpack

```bash
heroku buildpacks:set heroku/nodejs -a <app-name>
```

### Heroku CLI Deployment

1. Install CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login:
   ```bash
   heroku login
   ```
3. Create app:
   ```bash
   heroku create <app-name>
   ```
4. Set environment variables:
   ```bash
   heroku config:set NODE_ENV=production -a <app-name>
   heroku config:set MONGO_URI='<atlas-uri>' JWT_SECRET='<strong-secret>' JWT_EXPIRES_IN='1d' CLIENT_URL='https://<app-name>.herokuapp.com' -a <app-name>
   heroku config:set CLOUDINARY_CLOUD_NAME='<name>' CLOUDINARY_API_KEY='<key>' CLOUDINARY_API_SECRET='<secret>' -a <app-name>
   ```
5. Deploy:
   ```bash
   git push heroku HEAD:main
   ```
6. Scale dynos:
   ```bash
   heroku ps:scale web=1 -a <app-name>
   ```
7. Open app:
   ```bash
   heroku open -a <app-name>
   ```

### GitHub Integration Deployment

1. Heroku Dashboard → Deploy tab
2. Connect GitHub repository
3. Choose branch and enable automatic deploys
4. Trigger manual deploy once

### Manual Deployment (Container Registry)

```bash
heroku container:login
heroku container:push web -a <app-name>
heroku container:release web -a <app-name>
```

### Logs Monitoring Commands

```bash
heroku logs --tail -a <app-name>
heroku releases -a <app-name>
heroku ps -a <app-name>
```

### Scaling Instructions

```bash
heroku ps:scale web=2 -a <app-name>
```

### Troubleshooting

- **Build fails:** verify Node runtime and lockfiles are committed.
- **App boots but DB fails:** check `MONGO_URI` and Atlas IP allowlist.
- **CORS issues:** set `CLIENT_URL` to exact frontend domain.
- **Uploads fail:** confirm Cloudinary credentials.
- **Blank UI:** run `npm run build` and verify backend serves `backend/public`.

## Security Practices

- Helmet headers
- CORS restrictions
- Rate limiting
- Joi request validation
- JWT authorization + role permissions
- Centralized error handling

## Production Build

```bash
npm run build
npm start
```

## Notes

This repository provides a clean scalable ERP SaaS foundation with enterprise-style UX and extensible module architecture for deeper business workflows (exams, assignments, reports, backup scheduler, and advanced chatbot integrations).
