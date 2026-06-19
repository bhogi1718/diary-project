# 🗄️ MongoDB Atlas Setup Guide (FREE!)

Complete step-by-step guide to set up your free MongoDB Atlas database.

---

## Step 1: Create MongoDB Account

1. Go to **[mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)**
2. Click **"Try Free"** or **"Sign Up"**
3. Enter email, password, and confirm
4. Verify email (check your inbox)
5. Accept terms and create account

---

## Step 2: Create Your First Deployment

1. Click **"Create a Deployment"**
2. Choose **"Free"** tier (M0 Sandbox) - This is free forever!
3. Choose your preferred cloud provider (AWS, Google Cloud, Azure)
4. Choose region closest to you (or just use default)
5. Click **"Create Deployment"**
6. Wait 2-5 minutes for cluster to be ready

---

## Step 3: Create Database User

This is the username/password MongoDB will use to authenticate.

1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Fill in:
   - **Username:** `diaryuser`
   - **Password:** Click **"Generate Secure Password"** (copy it!)
4. Keep **"Authentication Method"** as **"Scram"** 
5. Click **"Add User"**

**⚠️ IMPORTANT:** Save this password somewhere safe!

---

## Step 4: Allow Network Access

MongoDB needs to know which IPs can connect.

1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for cloud deployment)
4. In the IP Address field, enter: `0.0.0.0/0`
5. Click **"Confirm"**

✅ This allows all IPs (needed for Render to connect)

---

## Step 5: Get Connection String

This is the URL your backend will use to connect.

1. Go to **"Clusters"** tab
2. Click **"Connect"** button on your cluster
3. Choose **"Drivers"** option
4. Select **"Node.js"** from the dropdown
5. Copy the connection string

**Example:**
```
mongodb+srv://diaryuser:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## Step 6: Modify Connection String

The string needs one modification:

**BEFORE:**
```
mongodb+srv://diaryuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**AFTER:**
```
mongodb+srv://diaryuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/diary?retryWrites=true&w=majority
```

Changes:
- Replace `<password>` with your actual password (the one you generated)
- Replace `?retryWrites=true` with `/diary?retryWrites=true` (adds database name)

---

## Step 7: Add to Backend .env

1. Open `backend/.env`
2. Update the `MONGO_URI` line:

```env
MONGO_URI=mongodb+srv://diaryuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/diary?retryWrites=true&w=majority
```

Replace `YOUR_PASSWORD` with your actual password.

---

## Step 8: Test Connection (Local)

1. Open terminal in backend folder:
   ```bash
   cd backend
   npm run dev
   ```

2. Look for message:
   ```
   MongoDB connected
   Server running on port 5000
   ```

✅ If you see this, connection works!

---

## 🔐 Security Notes

### DO NOT:
- ❌ Use `0.0.0.0/0` in production (only for development)
- ❌ Share your password publicly
- ❌ Commit `.env` file to GitHub
- ❌ Use simple passwords

### DO:
- ✅ Use strong passwords (MongoDB will auto-generate)
- ✅ Keep `.env` in `.gitignore`
- ✅ Use environment variables on Render
- ✅ Whitelist specific IPs in production (Render's IP)

---

## 📊 MongoDB Atlas Free Tier Limits

| Feature | Limit |
|---------|-------|
| Storage | 512 MB |
| Data Transfer | 1 GB/month |
| Connections | Up to 3 concurrent |
| Automated Backups | ❌ Not included |

**Perfect for testing and small personal projects!**

---

## 🚀 For Production (Render)

When you deploy to Render:

1. Go to Render dashboard → Your backend service
2. Go to **"Environment"** tab
3. Add/update:
   ```
   MONGO_URI=mongodb+srv://diaryuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/diary
   ```

4. MongoDB Atlas automatically allows Render's IPs (because we whitelisted `0.0.0.0/0`)

---

## 🆘 Troubleshooting

### "Failed to connect to MongoDB"
- Check internet connection
- Verify password is correct in `.env`
- Confirm cluster is ready (green dot in MongoDB)
- Make sure IP whitelist includes your computer's IP

### "Authentication failed"
- Check username: `diaryuser`
- Check password matches what you set
- Make sure `<password>` is replaced in connection string

### "Database not found"
- Ensure `/diary` is in the connection string
- MongoDB creates the database automatically on first write

### Slow connection
- Might be cluster startup
- Wait 1-2 minutes and try again
- Check MongoDB dashboard for any alerts

---

## ✅ Verification Checklist

- [ ] MongoDB account created
- [ ] Cluster deployed (green checkmark)
- [ ] Database user created (`diaryuser`)
- [ ] Network access whitelist set
- [ ] Connection string copied
- [ ] Password added to connection string
- [ ] `/diary` added to connection string
- [ ] `MONGO_URI` added to `backend/.env`
- [ ] Test local connection works
- [ ] `.env` added to `.gitignore`

---

## 📝 Example .env File

```env
# Replace YOUR_PASSWORD with actual password
MONGO_URI=mongodb+srv://diaryuser:YOUR_PASSWORD@cluster0.abc123def456.mongodb.net/diary?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_super_secret_random_key_min_32_chars
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## 🎉 You're Done!

Your MongoDB Atlas is ready to use. Next steps:

1. ✅ Test locally with `npm run dev`
2. → Deploy backend to Render
3. → Deploy frontend to Vercel
4. → Test live deployment

**Congratulations! Your secure database is set up!** 🚀
