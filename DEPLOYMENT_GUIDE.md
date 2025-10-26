# 🚀 ECE MATLAB Helper - Complete Deployment Guide

## 📋 Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Variables](#environment-variables)
3. [Backend Deployment (Flask)](#backend-deployment-flask)
4. [Frontend Deployment (Next.js)](#frontend-deployment-nextjs)
5. [Recommended Platforms](#recommended-platforms)
6. [Step-by-Step Deployment](#step-by-step-deployment)
7. [Post-Deployment](#post-deployment)

---

## ✅ Pre-Deployment Checklist

### 1️⃣ **Required Accounts:**
- [ ] **GitHub Account** (for code hosting)
- [ ] **Render.com Account** (for backend) - FREE tier available
- [ ] **Vercel Account** (for frontend) - FREE tier available
- [ ] **Google AI Studio Account** (for Gemini API key) - FREE tier available

### 2️⃣ **Environment Setup:**
- [ ] `.env` file configured for backend
- [ ] `.env.local` configured for frontend
- [ ] All dependencies installed and tested locally

---

## 🔑 Environment Variables

### **Backend (.env)**
Create a `.env` file in the `backend/` folder:

```env
# Google Gemini API Key (Required)
GEMINI_API_KEY=your_gemini_api_key_here

# Flask Configuration
FLASK_ENV=production
FLASK_DEBUG=False

# CORS Settings (Update with your frontend URL after deployment)
FRONTEND_URL=https://your-app.vercel.app
```

**How to get Gemini API Key:**
1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy and paste into `.env`

### **Frontend (.env.local)**
Create a `.env.local` file in the `frontend/` folder:

```env
# Backend API URL (Update after backend deployment)
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

---

## 🐍 Backend Deployment (Flask)

### **Option 1: Render.com (Recommended - FREE)**

#### Step 1: Prepare Your Code
```bash
# Make sure you have these files in backend/:
# - app.py
# - requirements.txt
# - Procfile (already exists)
```

#### Step 2: Create `runtime.txt` (Optional)
Create `backend/runtime.txt`:
```
python-3.11.0
```

#### Step 3: Deploy to Render

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Go to Render.com:**
   - Sign in: https://dashboard.render.com
   - Click "New +" → "Web Service"

3. **Connect Repository:**
   - Select your GitHub repository
   - Click "Connect"

4. **Configure Service:**
   ```
   Name: ece-matlab-helper-backend
   Region: Choose closest to your users
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn app:app
   ```

5. **Add Environment Variables:**
   - Click "Environment" tab
   - Add: `GEMINI_API_KEY` = your_key
   - Add: `FLASK_ENV` = production
   - Add: `FRONTEND_URL` = https://your-app.vercel.app (update later)

6. **Deploy:**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Copy the URL (e.g., `https://ece-matlab-helper-backend.onrender.com`)

#### Step 4: Test Backend
```bash
# Test health endpoint
curl https://your-backend.onrender.com/api/health
```

---

### **Option 2: Railway.app (Alternative)**

1. Go to: https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select repository
4. Configure:
   ```
   Root Directory: backend
   Start Command: gunicorn app:app
   ```
5. Add environment variables
6. Deploy!

---

### **Option 3: PythonAnywhere (FREE)**

1. Go to: https://www.pythonanywhere.com
2. Create free account
3. Upload code via Files tab
4. Configure WSGI file
5. Add environment variables in `.env`

---

## ⚡ Frontend Deployment (Next.js)

### **Option 1: Vercel (Recommended - FREE)**

#### Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

#### Step 2: Deploy via Web Interface

1. **Go to Vercel:**
   - Sign in: https://vercel.com
   - Click "Add New..." → "Project"

2. **Import Repository:**
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project:**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add: `NEXT_PUBLIC_BACKEND_URL` = https://your-backend.onrender.com
   - Click "Deploy"

5. **Deploy:**
   - Wait 2-5 minutes
   - Copy the URL (e.g., `https://ece-matlab-helper.vercel.app`)

#### Step 3: Update Backend CORS

Go back to Render.com and update the `FRONTEND_URL` environment variable with your Vercel URL.

---

### **Option 2: Netlify (Alternative)**

1. Go to: https://netlify.com
2. Click "Add new site" → "Import from Git"
3. Select repository
4. Configure:
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: .next
   ```
5. Add environment variables
6. Deploy!

---

## 🎯 Step-by-Step Deployment (Complete Flow)

### **Phase 1: Prepare Repository**

```bash
# 1. Make sure everything is committed
git status
git add .
git commit -m "Ready for deployment"

# 2. Push to GitHub
git push origin main
```

### **Phase 2: Deploy Backend First**

1. **Create Render Account:** https://render.com/register
2. **Create Web Service:**
   - New → Web Service
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `gunicorn app:app`

3. **Add Environment Variables:**
   ```
   GEMINI_API_KEY=your_key_here
   FLASK_ENV=production
   FRONTEND_URL=*  (update later)
   ```

4. **Deploy & Wait:**
   - Click "Create Web Service"
   - Wait 5-10 minutes
   - **Copy the backend URL!** (e.g., `https://ece-backend-xyz.onrender.com`)

### **Phase 3: Deploy Frontend**

1. **Create Vercel Account:** https://vercel.com/signup
2. **Import Project:**
   - New Project → Import from GitHub
   - Select your repository

3. **Configure:**
   - Framework: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`

4. **Add Environment Variable:**
   ```
   NEXT_PUBLIC_BACKEND_URL=https://ece-backend-xyz.onrender.com
   ```
   *(Use the URL from Phase 2)*

5. **Deploy & Wait:**
   - Click "Deploy"
   - Wait 2-5 minutes
   - **Copy the frontend URL!** (e.g., `https://ece-helper.vercel.app`)

### **Phase 4: Connect Frontend & Backend**

1. **Update Backend CORS:**
   - Go to Render.com dashboard
   - Open your backend service
   - Environment → Edit
   - Update `FRONTEND_URL` to your Vercel URL
   - Save & Redeploy

2. **Update Frontend API URL (if needed):**
   - Go to Vercel dashboard
   - Open your project
   - Settings → Environment Variables
   - Verify `NEXT_PUBLIC_BACKEND_URL` is correct

---

## 🧪 Post-Deployment Testing

### 1️⃣ **Test Backend:**
```bash
# Health check
curl https://your-backend.onrender.com/api/health

# Expected response:
{"status": "healthy"}
```

### 2️⃣ **Test Frontend:**
- Open: https://your-app.vercel.app
- Try generating an ECE practical
- Try Q&A chat
- Check for CORS errors in browser console (F12)

### 3️⃣ **Check Logs:**
- **Render:** Dashboard → Logs tab
- **Vercel:** Dashboard → Deployments → View Logs

---

## 🔧 Common Issues & Fixes

### ❌ **Issue: CORS Error**
```
Access to fetch at 'https://backend.com/api/chat' has been blocked by CORS
```

**Fix:**
1. Go to Render dashboard
2. Add/Update `FRONTEND_URL` environment variable
3. Redeploy backend

---

### ❌ **Issue: Backend 500 Error**
```
Internal Server Error
```

**Fix:**
1. Check Render logs
2. Verify `GEMINI_API_KEY` is set
3. Check `requirements.txt` has all dependencies

---

### ❌ **Issue: Frontend Build Fails**
```
Module not found: Can't resolve '@/components/...'
```

**Fix:**
1. Check `tsconfig.json` has correct paths
2. Verify all imports use `@/` prefix
3. Check `package.json` has all dependencies

---

## 📊 Deployment Cost Estimate

| Service | Tier | Cost | Limitations |
|---------|------|------|-------------|
| **Render.com** | Free | $0/month | 750 hours/month, sleeps after inactivity |
| **Vercel** | Hobby | $0/month | 100 GB bandwidth, unlimited projects |
| **Gemini API** | Free | $0/month | 60 requests/minute |
| **Total** | - | **$0/month** | Perfect for development/portfolio |

### **Paid Options (Production):**
- **Render:** $7/month (always online, no sleep)
- **Vercel:** $20/month (team features, analytics)

---

## 🎨 Custom Domain Setup (Optional)

### **For Frontend (Vercel):**
1. Go to Vercel dashboard
2. Project → Settings → Domains
3. Add your domain (e.g., `ece-helper.com`)
4. Update DNS records at your domain registrar

### **For Backend (Render):**
1. Go to Render dashboard
2. Service → Settings → Custom Domains
3. Add your domain (e.g., `api.ece-helper.com`)
4. Update DNS records

---

## 📱 Deployment Checklist

### **Before Deployment:**
- [ ] All features tested locally
- [ ] Backend runs without errors
- [ ] Frontend builds successfully
- [ ] `.env` files configured
- [ ] Code committed to GitHub

### **During Deployment:**
- [ ] Backend deployed to Render
- [ ] Backend URL copied
- [ ] Frontend deployed to Vercel
- [ ] Environment variables added
- [ ] CORS configured

### **After Deployment:**
- [ ] Health endpoint tested
- [ ] ECE Practical generation works
- [ ] Q&A Chat works
- [ ] No CORS errors
- [ ] Dark mode works
- [ ] Mobile responsive

---

## 🚀 Quick Deployment Commands

### **Backend (Render):**
```bash
# Already configured in Procfile
# Just push to GitHub and connect to Render
gunicorn app:app
```

### **Frontend (Vercel):**
```bash
# Login to Vercel CLI
vercel login

# Deploy from frontend folder
cd frontend
vercel --prod

# Or use web interface (recommended)
```

---

## 🔗 Useful Links

### **Hosting Platforms:**
- Render: https://render.com
- Vercel: https://vercel.com
- Railway: https://railway.app
- Netlify: https://netlify.com

### **API Services:**
- Gemini API: https://makersuite.google.com/app/apikey
- Google AI Studio: https://makersuite.google.com

### **Documentation:**
- Flask Deployment: https://flask.palletsprojects.com/en/2.3.x/deploying/
- Next.js Deployment: https://nextjs.org/docs/deployment
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs

---

## 🎯 Recommended Deployment Stack

**Best for Beginners:**
```
Frontend: Vercel (Free)
Backend: Render (Free)
Database: None required
API: Google Gemini (Free)
```

**Best for Production:**
```
Frontend: Vercel (Pro $20/month)
Backend: Render (Starter $7/month)
Monitoring: LogRocket or Sentry
Analytics: Vercel Analytics
```

---

## 💡 Pro Tips

1. **Free Tier Limitations:**
   - Render free tier sleeps after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds to wake up
   - Use $7/month tier to avoid sleep

2. **Environment Variables:**
   - Never commit `.env` files to GitHub
   - Always use `.gitignore` to exclude `.env`
   - Update environment variables in hosting platform UI

3. **Logs & Monitoring:**
   - Always check logs after deployment
   - Set up error tracking (Sentry)
   - Monitor API usage (Gemini quotas)

4. **Updates:**
   - Push to GitHub → Auto-deploys on Vercel/Render
   - Enable auto-deploy in both platforms
   - Test in staging before production

---

## 🎉 You're Ready!

Follow these steps and your ECE MATLAB Helper will be live on the internet! 🚀

**Questions?**
- Check the logs first
- Search error messages on Stack Overflow
- Review platform documentation

**Good luck with deployment! 💪**
