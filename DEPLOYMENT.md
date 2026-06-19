# 🚀 Deployment Guide: Render + Vercel + MongoDB Atlas

Complete step-by-step guide to deploy your secure diary app to production.

---

## 1️⃣ MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Sign Up"** and create an account (free tier available)
3. Create a new project

### Step 2: Create a Cluster
1. Click **"Create a Deployment"**
2. Choose **"Free"** tier (M0 Sandbox)
3. Select your region (closest to you)
4. Click **"Create Deployment"**
5. Wait for cluster to be ready (2-5 minutes)

### Step 3: Set Up Database User
1. Go to **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Enter username: `diaryuser`
4. Enter password: `Generate Secure Password` (copy it!)
5. Click **"Add User"**

### Step 4: Get Connection String
1. Go to **"Clusters"** → Click **"Connect"**
2. Choose **"Drivers"** → Select **"Node.js"**
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<username>` with `diaryuser`

**Example:**
```
mongodb+srv://diaryuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/diary?retryWrites=true&w=majority
```

### Step 5: Whitelist Your IPs
1. Go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Choose **"Allow access from anywhere"** (for cloud deployment)
4. Click **"Confirm"**

---

## 2️⃣ Backend Deployment (Render)

### Step 1: Prepare Backend
1. Update `backend/.env`:
```env
MONGO_URI=mongodb+srv://diaryuser:PASSWORD@cluster0.xxxxx.mongodb.net/diary?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_super_secret_random_key_here_make_it_long_and_random
```

2. Make sure `backend/package.json` has correct scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Click **"Sign Up"** (use GitHub for easier deployment)
3. Authorize GitHub access

### Step 3: Push to GitHub
1. Go to your project folder
2. Initialize git (if not done):
```bash
git init
git add .
git commit -m "Initial commit: Secure diary app"
```

3. Create repo on [github.com](https://github.com):
   - Click "New Repository"
   - Name: `diary-project`
   - Push your code

### Step 4: Deploy on Render
1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect a repository"** → Select your GitHub repo
4. Configure:
   - **Name:** `diary-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free` (optional, $7/month to keep always-on)

5. Click **"Advanced"** and add environment variables:
   - `MONGO_URI` = your MongoDB connection string
   - `JWT_SECRET` = your secret key
   - `NODE_ENV` = `production`

6. Click **"Create Web Service"**
7. Wait for deployment (3-5 minutes)
8. Copy the URL: `https://diary-backend-xxxx.onrender.com`

---

## 3️⃣ Frontend Deployment (Vercel)

### Step 1: Update Frontend Environment
1. Update `frontend/.env.production`:
```env
VITE_API_URL=https://diary-backend-xxxx.onrender.com/api
```
(Replace with your actual Render URL)

2. Update `frontend/.env.local` (for local testing):
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (use GitHub)
3. Authorize GitHub access

### Step 3: Deploy on Vercel
1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Select your GitHub repo: `diary-project`
4. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `React`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Click **"Environment Variables"** and add:
   - Key: `VITE_API_URL`
   - Value: `https://diary-backend-xxxx.onrender.com/api`

6. Click **"Deploy"**
7. Wait for deployment (2-3 minutes)
8. Your app is live! 🎉 Copy the Vercel URL

---

## 4️⃣ Enable CORS on Backend

Update `backend/server.js` to allow your frontend URL:

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'https://your-vercel-url.vercel.app',
  credentials: true
}));
```

Push this change and Render will auto-redeploy.

---

## 5️⃣ Post-Deployment Checklist

- ✅ Backend running on Render
- ✅ Frontend running on Vercel
- ✅ MongoDB Atlas cluster active
- ✅ CORS configured
- ✅ Environment variables set on both platforms
- ✅ Test signing up and creating entries
- ✅ Test editing and deleting entries
- ✅ Verify encryption working (content should be unreadable in DB)

---

## 🔍 Testing Your Deployment

1. Visit your Vercel URL
2. Sign up with an email
3. Create a diary entry
4. Close and reopen browser
5. Entry should load decrypted with same password
6. Check MongoDB Atlas to verify encrypted data

---

## 🆘 Troubleshooting

### "Cannot POST /api/auth/signup"
- Check backend URL in frontend `.env`
- Ensure Render backend is deployed and running
- Check CORS settings

### "MongoDB connection failed"
- Verify connection string in Render env variables
- Check IP whitelist in MongoDB Atlas
- Ensure password is correct

### "Decryption error"
- Same password must be used
- Password stored in localStorage when logged in

### Frontend builds but shows blank page
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly
- Check backend is accessible from frontend

---

## 📊 Costs

- **MongoDB Atlas:** Free (500MB storage)
- **Render:** Free (limited uptime) / $7/month (always-on)
- **Vercel:** Free
- **Total:** $0-7/month

---

## 🔐 Production Security Tips

1. ✅ Use strong `JWT_SECRET` (min 32 characters)
2. ✅ Keep `.env` files out of git (use `.gitignore`)
3. ✅ Enable HTTPS (automatic on Vercel/Render)
4. ✅ Set `NODE_ENV=production` on backend
5. ✅ Regularly update dependencies: `npm audit`
6. ✅ Use environment variables for secrets only
7. ✅ Enable MongoDB Atlas IP whitelist

---

## 🚀 Quick Deploy Script

After initial setup, redeploy is easy:

**Backend (Render):**
```bash
cd backend
git add .
git commit -m "Backend update"
git push origin main
# Render auto-deploys
```

**Frontend (Vercel):**
```bash
cd frontend
git add .
git commit -m "Frontend update"
git push origin main
# Vercel auto-deploys
```

---

## Next Steps

1. Set up MongoDB Atlas (free account)
2. Push to GitHub
3. Deploy backend on Render
4. Deploy frontend on Vercel
5. Update API URLs
6. Test everything!

**Happy deploying! 🎉**
