# AI-Learning-Platform 🤖

A production-grade mini AI-driven learning system built with **FastAPI**, **React**, **PostgreSQL**, and **OpenAI API**.

---

## 📌 Project Description

This platform allows users to:
- Register and log in
- Choose a category and sub-category to learn
- Send prompts to an AI (OpenAI GPT)
- View AI-generated lessons
- Track learning history
- Admin view to manage all users and prompts

---

## 🛠 Tech Stack

**Backend**: Python (FastAPI), SQLAlchemy, PostgreSQL, Uvicorn  
**Frontend**: React, TypeScript, MUI  
**AI**: OpenAI GPT-3.5  
**DevOps**: Docker & Docker Compose  
**Tools**: dotenv, Axios, React Router, VSCode  

---

## 📂 Project Structure

```
AI-Learning-Platform/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── schemas/
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── components/
│   │   └── api/
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

---

## 🚀 Running the Project Locally

### 📦 Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Add `.env` file:
   ```dotenv
   OPENAI_API_KEY=your_key_here
   DATABASE_URL=postgresql+asyncpg://postgres:password@db:5432/learning
   ```

5. Run backend:
   ```bash
   uvicorn app.main:app --reload
   ```

---

### 🌐 Frontend Setup

1. Navigate to frontend:
   ```bash
   cd frontend
   ```

2. Install packages:
   ```bash
   npm install
   ```

3. Run React app:
   ```bash
   npm run dev
   ```

---

### 🐳 With Docker

To start everything (backend + db):

```bash
docker-compose up --build
```

---

## 🔐 Sample .env File

```dotenv
# backend/.env
OPENAI_API_KEY=sk-************************************
DATABASE_URL=postgresql+asyncpg://postgres:password@db:5432/learning
```

---

## 📌 API Endpoints Overview

- `POST /users/register` — Register a user
- `POST /users/login` — Log in a user
- `GET /categories/`, `GET /sub-categories/:name`
- `POST /prompts/` — Submit prompt and get AI answer
- `GET /prompts/user/:id` — View user history
- Admin: `GET /prompts/`, `GET /users/`, etc.

---

## ✨ Features

- Modular architecture (models/routes/services)
- AI integration via OpenAI API
- Dynamic category + sub-category structure
- Admin dashboard for full user & prompt control
- Full error handling & validation
- Clean UI with Material Design

---

## 📝 Submission Notes

Public repository:  
[https://github.com/RachelGenauer/AI-Learning-Platform](https://github.com/RachelGenauer/AI-Learning-Platform)

Built in 2-3 days as part of a technical fullstack assignment.  
Focused on clear architecture, modular code, and real-world standards.

---

© 2025 Rachel Genauer. All rights reserved.


## 📥 Clone the Project

You can clone the project and start working locally with the following command:

```bash
git clone https://github.com/RachelGenauer/AI-Learning-Platform.git
cd AI-Learning-Platform
```

