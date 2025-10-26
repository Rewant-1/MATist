# ⚡ Quick Deploy - 5 Minute Setup

## 🎯 Super Fast Deployment (Copy-Paste Commands)

### Step 1: Get Gemini API Key (2 minutes)
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### Step 2: Deploy Backend to Render (2 minutes)
1. Go to: https://render.com
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Select your repository
5. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
6. Add Environment Variable:
   - `GEMINI_API_KEY` = paste your key
7. Click "Create Web Service"
8. **COPY THE URL** (e.g., `https://your-app.onrender.com`)

### Step 3: Deploy Frontend to Vercel (1 minute)
1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your repository
5. Configure:
   - **Framework:** Next.js
   - **Root Directory:** `frontend`
6. Add Environment Variable:
   - `NEXT_PUBLIC_BACKEND_URL` = paste backend URL from Step 2
7. Click "Deploy"
8. Wait 2 minutes → **DONE!** 🎉

---

## 🔗 Your Live URLs

After deployment:
- **Frontend:** `https://your-project.vercel.app`
- **Backend:** `https://your-app.onrender.com`

Test: Open frontend URL and try generating an ECE practical!

---

## 🐛 If Something Breaks

### Backend not working?
```bash
# Check Render logs:
# Render Dashboard → Your Service → Logs
```

### Frontend not connecting?
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Check `NEXT_PUBLIC_BACKEND_URL` is correct
3. Redeploy if needed

### CORS Error?
1. Render Dashboard → Environment
2. Add: `FRONTEND_URL` = your Vercel URL
3. Redeploy

---

## 💰 Cost: $0 (100% FREE)
- Render Free Tier: 750 hours/month
- Vercel Free Tier: Unlimited
- Gemini API: 60 requests/min free

---

**Need more help? Check `DEPLOYMENT_GUIDE.md` for detailed instructions!**
