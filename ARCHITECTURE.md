# 🏗️ Architecture Overview

Complete system architecture of your secure diary app.

---

## 🌐 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        INTERNET                                  │
└─────────────────────────────────────────────────────────────────┘
         │                                        │
         │                                        │
    ┌────▼─────────────────┐          ┌─────────▼──────────────┐
    │  VERCEL (Frontend)   │          │  RENDER (Backend)      │
    │                      │          │                        │
    │  React + Vite        │◄────────►│  Express.js + Node     │
    │  - UI Components     │  HTTPS   │  - API Routes          │
    │  - Encryption        │          │  - Authentication      │
    │  - File Upload       │          │  - Database Logic      │
    │                      │          │                        │
    └──────────────────────┘          └─────────┬──────────────┘
          https://diary-            https://diary-backend-
          app.vercel.app             xxxxx.onrender.com
                                            │
                                            │
                                       ┌────▼──────────────┐
                                       │ MONGODB ATLAS     │
                                       │                   │
                                       │ Cloud Database     │
                                       │ - User accounts    │
                                       │ - Encrypted entries│
                                       │ - Free tier        │
                                       │                   │
                                       └───────────────────┘
```

---

## 📡 Data Flow

### Writing a Diary Entry

```
1. USER TYPES IN BROWSER
   ↓
2. REACT COMPONENT ENCRYPTS
   - Content encrypted with AES-256
   - Only encrypted string sent to server
   ↓
3. SENDS TO BACKEND API
   - POST /api/diary
   - Include JWT token in header
   ↓
4. BACKEND VALIDATES JWT
   - Verifies user token is valid
   - Extracts userId
   ↓
5. MONGODB STORES
   - Saves encrypted content
   - Stores with userId & timestamp
   ↓
6. RETURNS SUCCESS
   - Frontend shows "Saved!"
   - User can now create another entry
```

### Reading a Diary Entry

```
1. USER CLICKS ENTRY
   ↓
2. FRONTEND FETCHES FROM BACKEND
   - GET /api/diary/:id
   - Includes JWT token
   ↓
3. BACKEND RETRIEVES
   - Queries MongoDB
   - Checks ownership (userId matches)
   - Returns encrypted content
   ↓
4. FRONTEND DECRYPTS
   - React decrypts using user's password
   - PASSWORD stored locally in localStorage
   ↓
5. SHOWS PLAINTEXT
   - User can read their entry
   - No server ever sees plaintext
```

---

## 🔐 Security Layers

### Layer 1: Transport Security
```
HTTPS (Automatic on Vercel & Render)
    ↓
- All communication encrypted in transit
- Browser ↔ Server: TLS/SSL
- Server ↔ Database: Encrypted connection
```

### Layer 2: Authentication
```
JWT Token + Password Hash
    ↓
Login Flow:
1. User enters email + password
2. Server hashes password with bcrypt
3. Compares to stored hash
4. Returns JWT token (expires in 7 days)
5. Frontend stores token in localStorage
6. Token sent with every API request
```

### Layer 3: Authorization
```
Auth Middleware on Backend
    ↓
- Every protected route checks JWT
- Extracts userId from token
- Verifies token signature with JWT_SECRET
- Allows/denies request based on token validity
```

### Layer 4: Data Encryption
```
Client-Side AES Encryption
    ↓
Before Sending:
1. User's password used as encryption key
2. Diary content encrypted with crypto-js
3. Only encrypted string sent to server
4. Server has NO access to plaintext

After Retrieving:
1. Frontend receives encrypted data
2. Uses password to decrypt
3. Shows plaintext only in browser
4. Never sent to server
```

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: "user@example.com",
  password: "$2a$10$hashed_password...", // bcrypt hash
  createdAt: ISODate("2024-06-19")
}
```

### DiaryEntries Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // reference to User
  title: "My Day",
  encryptedContent: "U2FsdGVkX1...", // encrypted with crypto-js
  createdAt: ISODate("2024-06-19"),
  updatedAt: ISODate("2024-06-19")
}
```

---

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://diary-backend-xxxxx.onrender.com/api
```
**Used for:** Backend API endpoint URL

### Backend (.env & Render)
```env
MONGO_URI=mongodb+srv://diaryuser:password@cluster0.xxxxx.mongodb.net/diary
JWT_SECRET=your_long_random_secret_min_32_chars
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
```

**Used for:** Database connection, token signing, CORS

---

## 🚀 Deployment Workflow

```
1. LOCAL DEVELOPMENT
   ├─ Backend: npm run dev (port 5000)
   ├─ Frontend: npm run dev (port 5173)
   └─ Test locally

2. GITHUB
   ├─ Commit changes
   └─ Push to GitHub

3. RENDER (Backend)
   ├─ Auto-deployed from GitHub
   ├─ Installs dependencies
   ├─ Runs: npm start
   └─ Outputs URL: https://diary-backend-xxx.onrender.com

4. VERCEL (Frontend)
   ├─ Auto-deployed from GitHub
   ├─ Installs dependencies
   ├─ Runs: npm run build
   ├─ Deploys dist folder
   └─ Outputs URL: https://diary-xxx.vercel.app

5. LIVE
   └─ User can access app at Vercel URL
```

---

## 💾 Backup Strategy

### Automatic Backups
- MongoDB Atlas: Free tier doesn't include automatic backups
- Render: Logs available in dashboard

### Manual Backups
```bash
# Export all your entries (if you add this feature)
# Can add export-to-JSON button in frontend
```

### Data Recovery
- If password forgotten: Can't decrypt (by design!)
- If account locked: Email recovery not implemented
- If database deleted: Lost forever (no backup)

---

## ⚡ Performance

### Frontend Performance
- Vite: Fast bundling & HMR
- React: Component optimization
- Encryption: Done client-side (doesn't block server)

### Backend Performance
- Express: Lightweight & fast
- MongoDB: Query optimization with indexes
- JWT: Stateless (no session storage)

### Network Performance
- CDN: Vercel includes global CDN
- Database: MongoDB free tier has latency limits
- CORS: Configured to avoid preflight requests

---

## 📈 Scalability

### Free Tier Limits
- MongoDB: 512 MB storage
- Render: Limited uptime (sleeps after 15 min inactivity)
- Vercel: 100GB bandwidth/month

### Scaling Options
- **MongoDB:** Upgrade to M2 ($9/month) for more storage
- **Render:** Pay plan ($7+/month) for always-on
- **Vercel:** Stay free until 100GB bandwidth used

---

## 🔍 Monitoring

### What to Monitor
1. **Backend Logs** → Render dashboard
2. **Frontend Errors** → Browser console
3. **Database** → MongoDB Atlas dashboard
4. **Performance** → Vercel Analytics

### Common Issues
- 503 errors on Render = cold start (normal on free tier)
- Long response times = MongoDB cold start
- CORS errors = Frontend URL not in backend whitelist

---

## 🔄 CI/CD Pipeline

```
GitHub Push
    ↓
Render Hook (Backend)
    ├─ Pull latest code
    ├─ npm install
    ├─ npm start
    └─ Deploy
    
Vercel Hook (Frontend)
    ├─ Pull latest code
    ├─ npm install
    ├─ npm run build
    └─ Deploy dist folder
```

No manual deployment needed - automatic on push!

---

## 🎯 Tech Stack Summary

| Layer | Technology | Role | Cost |
|-------|-----------|------|------|
| Frontend | React + Vite | UI & Client-side encryption | Free (Vercel) |
| Backend | Express.js + Node | API & Authentication | Free/Paid (Render) |
| Database | MongoDB Atlas | Data storage | Free (512MB) |
| Hosting | Render + Vercel | Cloud deployment | Free (limited) |
| Encryption | crypto-js | AES-256 encryption | Free |
| Auth | JWT + bcryptjs | Secure authentication | Free |

---

## 🌟 Key Features

1. **Client-Side Encryption** ✅
   - Data encrypted before leaving browser
   - Server never sees plaintext

2. **Secure Authentication** ✅
   - Passwords hashed with bcrypt
   - JWT tokens with expiration

3. **Cloud Database** ✅
   - MongoDB Atlas (free tier)
   - Automatic backups

4. **Global Availability** ✅
   - Deployed on fast CDNs
   - Access from anywhere

5. **Privacy** ✅
   - No tracking
   - No analytics
   - No ads

---

## 📞 Support & Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Docs:** https://docs.mongodb.com/atlas
- **Express Guide:** https://expressjs.com
- **React Guide:** https://react.dev

---

**Your app is built with security-first architecture! 🔒**
