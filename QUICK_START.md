# ⚡ Quick Start & Deployment Checklist

## 🏃 Local Development (5 minutes)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
Runs on: `http://localhost:5000`

### Terminal 2 - Frontend  
```bash
cd frontend
npm run dev
```
Runs on: `http://localhost:5173`

---

## 🌐 Deploy to Production (30 minutes)

### Step 1: MongoDB Atlas (Free)
- [ ] Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Create free cluster
- [ ] Create database user: `diaryuser`
- [ ] Get connection string
- [ ] Add to `backend/.env` as `MONGO_URI`
- [ ] Whitelist all IPs in "Network Access"

### Step 2: GitHub
- [ ] Initialize git: `git init`
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Create repo on GitHub
- [ ] Push: `git push -u origin main`

### Step 3: Deploy Backend (Render)
- [ ] Sign up at [render.com](https://render.com) with GitHub
- [ ] Create new Web Service
- [ ] Select your diary-project repo
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Add environment variables:
  ```
  MONGO_URI=mongodb+srv://...
  JWT_SECRET=your_long_random_secret
  NODE_ENV=production
  ```
- [ ] Deploy and copy the URL

### Step 4: Deploy Frontend (Vercel)
- [ ] Sign up at [vercel.com](https://vercel.com) with GitHub
- [ ] Import your repo
- [ ] Set root directory: `frontend`
- [ ] Add environment variable:
  ```
  VITE_API_URL=https://your-render-backend-url/api
  ```
- [ ] Deploy

### Step 5: Update CORS
- [ ] Edit `backend/server.js`
- [ ] Update CORS origin to your Vercel URL
- [ ] Push changes (auto-redeploys on Render)

---

## ✅ Environment Variables Reference

### `backend/.env` (Development)
```env
MONGO_URI=mongodb+srv://diaryuser:PASSWORD@cluster0.xxxxx.mongodb.net/diary?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=make_this_long_and_random_min_32_chars
NODE_ENV=development
```

### `frontend/.env` (Development)
```env
VITE_API_URL=http://localhost:5000/api
```

### Render Environment Variables (Backend)
```
MONGO_URI=mongodb+srv://diaryuser:PASSWORD@cluster0.xxxxx.mongodb.net/diary
JWT_SECRET=make_this_long_and_random_min_32_chars
NODE_ENV=production
```

### Vercel Environment Variables (Frontend)
```
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

---

## 🧪 Test Checklist

- [ ] Sign up with new email
- [ ] Create a diary entry
- [ ] Refresh page - entry still there (decrypted)
- [ ] Edit entry
- [ ] Delete entry
- [ ] Logout and login again
- [ ] Old entries load with same password

---

## 🔐 Security Checklist

- [ ] `.env` files in `.gitignore`
- [ ] `JWT_SECRET` is strong (32+ chars, random)
- [ ] MongoDB whitelist includes all IPs
- [ ] CORS only allows your Vercel domain
- [ ] Using HTTPS (automatic on Vercel/Render)
- [ ] Never commit `.env` files

---

## 💰 Cost Estimate

| Service | Free Tier | Cost |
|---------|-----------|------|
| MongoDB Atlas | 512MB storage | Free ✅ |
| Render | Limited uptime | Free / $7/month |
| Vercel | Up to 100GB bandwidth | Free ✅ |
| **Total** | | **Free - $7/month** |

---

## 📝 File Structure Created

```
diary-project/
├── backend/
│   ├── models/         (User, DiaryEntry)
│   ├── routes/         (auth, diary)
│   ├── middleware/     (auth.js)
│   ├── server.js
│   ├── package.json
│   ├── .env            ← Fill this in
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/ (Auth, DiaryList, DiaryEditor)
│   │   ├── utils/      (encryption, api)
│   │   └── styles/     (CSS files)
│   ├── .env            ← For development
│   ├── .env.production ← For production
│   ├── package.json
│   └── .gitignore
├── README.md           (Full documentation)
├── DEPLOYMENT.md       (Detailed deployment guide)
└── QUICK_START.md      (This file)
```

---

## 🚀 Next Steps

1. **Local Testing**: Run backend & frontend locally, test all features
2. **Get MongoDB Atlas URL**: Set up free cluster, get connection string
3. **Push to GitHub**: Initialize git repo and push code
4. **Deploy Backend**: Create Render account and deploy
5. **Deploy Frontend**: Create Vercel account and deploy
6. **Update URLs**: Replace Render URL in Vercel env variables
7. **Test Live**: Visit Vercel URL and test full flow

---

## 📚 Need More Help?

- `README.md` - Full feature documentation
- `DEPLOYMENT.md` - Detailed step-by-step deployment guide
- Backend logs: Check Render dashboard
- Frontend logs: Check browser DevTools console

**Total time to production: ~1 hour** ⏱️

Good luck! 🎉
