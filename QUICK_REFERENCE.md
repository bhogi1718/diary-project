# 📋 Quick Reference Guide

Keep this handy during deployment!

---

## 🔗 Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas | Cloud database |
| Render Dashboard | https://dashboard.render.com | Backend hosting |
| Vercel Dashboard | https://vercel.com/dashboard | Frontend hosting |
| GitHub | https://github.com | Code repository |

---

## 🔑 Key Credentials to Save

### MongoDB Atlas
```
Username: diaryuser
Password: [SAVE YOUR GENERATED PASSWORD]
Database Name: diary
Connection String: mongodb+srv://diaryuser:PASSWORD@cluster0.xxxxx.mongodb.net/diary
```

### JWT Secret (for Backend)
```
JWT_SECRET: [GENERATE RANDOM STRING - MIN 32 CHARS]
Keep this PRIVATE and SECURE!
```

---

## 📁 Environment Variables Checklist

### `backend/.env` (Local)
```
☐ MONGO_URI=...
☐ JWT_SECRET=...
☐ PORT=5000
☐ NODE_ENV=development
☐ FRONTEND_URL=http://localhost:5173
```

### `frontend/.env` (Local)
```
☐ VITE_API_URL=http://localhost:5000/api
```

### Render Environment Variables (Backend)
```
☐ MONGO_URI=...
☐ JWT_SECRET=...
☐ NODE_ENV=production
☐ FRONTEND_URL=https://your-vercel-url.vercel.app
```

### Vercel Environment Variables (Frontend)
```
☐ VITE_API_URL=https://your-render-backend.onrender.com/api
```

---

## 🚀 Command Cheat Sheet

### Local Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### GitHub Operations
```bash
# Initialize & first push
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/diary-project
git push -u origin main

# Future pushes (auto-deploys)
git add .
git commit -m "Your message"
git push
```

### Test Locally
```bash
# Backend running?
curl http://localhost:5000

# Frontend running?
curl http://localhost:5173
```

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] MongoDB Atlas cluster created
- [ ] Database user created (diaryuser)
- [ ] Connection string in `backend/.env`
- [ ] JWT_SECRET generated (32+ chars)
- [ ] Tested locally (both frontend & backend)
- [ ] Git initialized and committed

### Render (Backend)
- [ ] Render account created with GitHub
- [ ] Repository connected to Render
- [ ] Environment variables added
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Deployed successfully
- [ ] Backend URL copied

### Vercel (Frontend)
- [ ] Vercel account created with GitHub
- [ ] Repository connected to Vercel
- [ ] Root directory set to `frontend`
- [ ] Environment variables added:
  - `VITE_API_URL=https://render-backend-url/api`
- [ ] Deployed successfully
- [ ] Frontend URL noted

### Final Configuration
- [ ] CORS updated in backend (FRONTEND_URL)
- [ ] Render backend redeployed
- [ ] Tested end-to-end (signup → create → read → delete)

---

## 🧪 Testing Scenarios

### Test 1: Sign Up
```
1. Go to https://your-vercel-app.vercel.app
2. Enter email: test@example.com
3. Enter password: testpass123
4. Click "Sign Up"
✅ Should login and show empty diary
```

### Test 2: Create Entry
```
1. Click "+ New Entry"
2. Title: "My First Entry"
3. Content: "This is encrypted!"
4. Click "Save"
✅ Should appear in list
```

### Test 3: Verify Encryption
```
1. Open MongoDB Atlas
2. Go to Database → Collections
3. View encrypted content
✅ Should show encrypted string like: U2FsdGVkX1...
```

### Test 4: Read Entry
```
1. Click entry in list
2. Content should decrypt
✅ Should show original text
```

### Test 5: Session Persistence
```
1. Create entry
2. Refresh browser
3. Login again with same password
✅ Entry should be there and decrypted
```

---

## 🆘 Emergency Troubleshooting

### "Cannot connect to MongoDB"
```
1. Check MONGO_URI in .env (copy-paste carefully)
2. Verify password - use MongoDB-generated password
3. Check IP whitelist in MongoDB Atlas
4. Ensure /diary is in connection string
```

### "CORS Error in Browser"
```
1. Check backend FRONTEND_URL env variable
2. Ensure it matches your Vercel URL
3. Redeploy backend after changing
4. Clear browser cache (Ctrl+Shift+Delete)
```

### "Decryption Error"
```
1. Ensure same password used for login
2. Check localStorage has password saved
3. Try logging out and in again
4. Check browser console for errors
```

### "Render 503 Service Unavailable"
```
1. Wait 30 seconds (cold start)
2. Refresh page
3. Check Render dashboard logs
4. If error persists, redeploy
```

### "Vercel Shows Blank Page"
```
1. Check browser console (F12 → Console tab)
2. Look for error messages
3. Verify VITE_API_URL is set in Vercel
4. Clear browser cache and reload
5. Check if backend is running
```

---

## 📊 Useful Dashboard Links

After deployment, bookmark these:

### Render Dashboard
```
https://dashboard.render.com
- View backend logs
- Check deployment status
- Update environment variables
- Restart service
```

### Vercel Dashboard
```
https://vercel.com/dashboard
- View frontend logs
- Check deployment history
- Update environment variables
- See analytics
```

### MongoDB Atlas
```
https://www.mongodb.com/cloud/atlas
- View database statistics
- Monitor data usage
- Manage database users
- View collections
```

---

## 💡 Pro Tips

1. **Auto-Redeploy:** Any push to GitHub automatically redeploys
2. **Check Logs:** Always check dashboard logs if something fails
3. **Test Locally First:** Always test locally before pushing
4. **Backup Passwords:** Save MongoDB password somewhere safe
5. **Monitor Usage:** Free tier has limits, keep eye on MongoDB storage
6. **Clear Cache:** If UI looks wrong, clear cache (Ctrl+Shift+Delete)
7. **Check CORS:** Most errors are CORS - update FRONTEND_URL

---

## 🔄 Common Workflow

```
Make change locally
    ↓
Test on localhost:5173
    ↓
Commit to git
    ↓
git push
    ↓
Render redeploys backend
Vercel redeploys frontend
    ↓
Check live app
    ↓
Done!
```

---

## 📞 Quick Help Links

- **Stuck on MongoDB?** → Read `MONGODB_SETUP.md`
- **Deployment help?** → Read `DEPLOYMENT.md`
- **Architecture questions?** → Read `ARCHITECTURE.md`
- **Quick start?** → Read `QUICK_START.md`
- **Features?** → Read `README.md`

---

## ✅ Success Indicators

Your app is working when you see:

✅ **Backend**
- Render logs show "Server running on port 5000"
- MongoDB connected message

✅ **Frontend**
- Vercel deployment successful
- App loads without blank page

✅ **Database**
- MongoDB shows cluster active (green dot)
- Can view collections in MongoDB Atlas

✅ **Features**
- Sign up works
- Can create diary entry
- Can read encrypted entry
- Can delete entry
- Can logout/login

---

## 🎉 You're Ready!

Keep this guide handy and follow the checklists.

**Happy deploying! 🚀**
