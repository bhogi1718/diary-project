# 📓 Secure Personal Diary

A fully encrypted MERN stack application for writing and storing personal diary entries. All entries are encrypted client-side before being sent to the server, ensuring only you can read your thoughts.

## Features

✅ **Client-Side Encryption** - Entries encrypted in browser using password, server never sees plaintext
✅ **Secure Authentication** - JWT-based auth with bcrypt password hashing
✅ **Cloud Database** - MongoDB Atlas for reliable cloud storage
✅ **Responsive Design** - Works on desktop and mobile
✅ **Create, Read, Update, Delete** - Full CRUD operations for diary entries

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Express.js + Node.js
- **Database**: MongoDB Atlas (cloud)
- **Authentication**: JWT + bcryptjs
- **Encryption**: crypto-js (client-side AES encryption)

## Project Structure

```
diary-project/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── utils/
│   │   └── styles/
│   └── package.json
└── backend/           # Express server
    ├── models/
    ├── routes/
    ├── middleware/
    └── package.json
```

## Setup Instructions

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string:
   - Click "Connect" → "Drivers" → Select "Node.js"
   - Copy the connection string
5. Replace `<password>` with your database password and update backend `.env`

### 2. Backend Setup

```bash
cd backend

# Create .env file and add:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/diary
PORT=5000
JWT_SECRET=your_very_secret_key_here_change_this

# Install dependencies
npm install

# Start development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies (if not done already)
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## How It Works

### Authentication Flow
1. User signs up/logs in with email and password
2. Password is hashed with bcryptjs on backend
3. JWT token issued for subsequent requests
4. Password stored locally in browser for encryption

### Encryption Flow
1. User writes diary entry in React editor
2. **Before sending to server**, entry is encrypted using crypto-js with user's password
3. Only encrypted string is sent to backend
4. Backend stores encrypted data in MongoDB
5. When reading, encrypted data fetched and decrypted client-side

### Security Features
- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens with 7-day expiration
- Client-side AES encryption using password
- CORS enabled for frontend/backend communication
- Authorization middleware on protected routes

## Running Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` in your browser

## Deployment

### Backend Deployment (Heroku, Render, etc.)

1. Set environment variables on hosting platform:
   - `MONGO_URI`
   - `PORT`
   - `JWT_SECRET`

2. Update frontend `.env.local` to point to deployed backend:
   ```
   VITE_API_URL=https://your-backend-url/api
   ```

### Frontend Deployment (Vercel, Netlify, etc.)

1. Build for production:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to your hosting platform

3. Ensure backend URL is correctly set in environment variables

## Security Warnings

⚠️ **Never commit .env files** - Add to `.gitignore`
⚠️ **Change JWT_SECRET** - Use a strong, random secret
⚠️ **Use HTTPS** - Always deploy with HTTPS in production
⚠️ **Password Recovery** - Forgotten passwords cannot be recovered (entries encrypted with it)

## Troubleshooting

**CORS Error:**
- Ensure backend is running on port 5000
- Check `frontend/.env.local` has correct API URL

**MongoDB Connection Failed:**
- Verify connection string in `backend/.env`
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure password is URL-encoded in connection string

**Decryption Error:**
- Password might be incorrect
- Ensure same password used for encryption and decryption

## Future Enhancements

- [ ] Export diary entries to PDF
- [ ] Search functionality
- [ ] Tags/categories for entries
- [ ] Dark mode
- [ ] Backup/recovery system
- [ ] Two-factor authentication

## License

MIT - Feel free to use this for personal projects

---

**Made with ❤️ for your private thoughts**
