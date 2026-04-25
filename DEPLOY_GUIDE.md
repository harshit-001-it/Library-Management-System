# 🚀 Production Deployment Guide

This guide will help you deploy the AI Library Management System to the cloud for free.

---

## 🏗️ Deployment Architecture
- **Database**: Supabase (PostgreSQL)
- **Backend API**: Render (FastAPI)
- **Frontend UI**: Vercel (React/Vite)
- **AI Engine**: Google Gemini API

---

## 🔑 Phase 1: Database (Supabase)
1. Go to [Supabase.com](https://supabase.com/) and create a new project.
2. Go to **Project Settings > Database**.
3. Under **Connection String**, select **URI** and copy the string.
   - It looks like: `postgresql://postgres.[ID]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
4. **Note your Password**: You set this when creating the Supabase project.

---

## 🔥 Phase 2: Backend API (Render.com)
1. Push your entire project to **GitHub**.
2. Go to [Render.com](https://render.com/) and create a **New Web Service**.
3. Connect your GitHub repository.
4. **Configuration**:
   - **Name**: `library-backend`
   - **Environment**: `Python 3`
   - **Region**: Select the one closest to you.
   - **Branch**: `main`
   - **Root Directory**: `backend` (Important!)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables**:
   - Click **Advanced > Add Environment Variable**.
   - `DATABASE_URL`: (Paste your Supabase URI and **replace `[YOUR-PASSWORD]`** with your actual password).
   - `GEMINI_API_KEY`: 
       1. Go to [Google AI Studio](https://aistudio.google.com/).
       2. Click **"Get API key"** on the left sidebar.
       3. Click **"Create API key in new project"**.
       4. Copy the key and paste it into Render.
   - `SECRET_KEY`: 
       - This is for security. You can use any long random string.
       - **Pro Tip**: Run `python -c "import secrets; print(secrets.token_urlsafe(32))"` in your terminal to generate a secure one.
6. Click **Create Web Service**. Wait for the "Live" status.
7. **Copy your Render URL**: (e.g., `https://library-backend.onrender.com`)

---

## ✨ Phase 3: Frontend UI (Vercel)
1. Go to [Vercel.com](https://vercel.com/) and create a **New Project**.
2. Connect the same GitHub repository.
3. **Configuration**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
4. **Environment Variables**:
   - `VITE_API_URL`: `https://your-render-url.onrender.com/api/v1` (Paste your Render URL here and add `/api/v1`)
5. Click **Deploy**. Done!

---

## 🛠️ Post-Deployment Seeding
Once the backend is live, you need to seed the production database:
1. Temporarily update your local `.env` with the **Supabase URL**.
2. Run `python backend/seed.py` from your terminal.
3. This will create the Admin/Staff accounts on your cloud database.

---

## 📝 Important Tips
- **Free Tier Sleep**: Render's free tier goes to sleep after 15 mins of inactivity. The first request might take 30-50 seconds to "wake up" the server.
- **CORS**: The backend is currently configured to allow all origins (`allow_origins=["*"]`). For maximum security in production, you can change this to your specific Vercel URL in `backend/app/main.py`.
