# FSAD-PS28: EduResource Library

A modern, professional full-stack educational resource library platform for students and educators.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS 4, Framer Motion, Axios, React Icons, React Toastify.
- **Backend**: Node.js, Express, MongoDB, Multer, JWT, Bcrypt.

## Project Structure
- `/frontend`: React Vite frontend
- `/backend`: Node/Express backend

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `mongodb://127.0.0.1:27017/edu-resource-library`)

### 1. Setup Backend
```bash
cd backend
npm install
# Import sample data (requires MongoDB running)
npm run data:import
# Start development server
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend
npm install
# Start development server
npm run dev
```

## Admin Credentials (if seeded)
- **Email**: admin@edu.com
- **Password**: password123

## Student Credentials (if seeded)
- **Email**: student@edu.com
- **Password**: password123

## Core Features
1. **Security**: Role-based access control with JWT and bcrypt hashing.
2. **Resource Management**: Admins can upload resources (PDFs, docs) and manage metadata.
3. **Discovery**: Search resources by title, subject, and author. Filter by category and resource type.
4. **Community**: User feedback/ratings on resources.
5. **Dashboard**: Analytics view for administrators.

## License
Academic License - FSAD Project PS28.
