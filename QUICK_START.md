# 🚀 Quick Start Guide

## Get Your Secure Backend Running in 5 Minutes

### Prerequisites

- ✅ Node.js 18+ installed
- ✅ MongoDB (Atlas account OR local installation)

---

## Step 1: Backend Setup (2 minutes)

```powershell
# Navigate to backend
cd "C:\Users\tbc21\OneDrive\Desktop\Website Practices\S1\backend"

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### Generate Secrets

Run this command **3 times** and save each result:

```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Edit `.env` file

Open `backend\.env` and update:

```env
JWT_SECRET=<paste first generated secret>
JWT_REFRESH_SECRET=<paste second generated secret>
SESSION_SECRET=<paste third generated secret>

# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/strawberry_milkshake

# OR for local MongoDB:
MONGODB_URI=mongodb://localhost:27017/strawberry_milkshake
```

---

## Step 2: MongoDB Setup (1 minute)

### Option A: MongoDB Atlas (Recommended)

1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Create free account & cluster
3. Click "Create Database User" → Set username & password
4. Click "Network Access" → "Add IP Address" → "Allow Access from Anywhere"
5. Click "Connect" → "Connect your application" → Copy connection string
6. Paste into `MONGODB_URI` in `.env` (replace `<password>` and `<dbname>`)

### Option B: Local MongoDB

1. Install MongoDB Community: https://www.mongodb.com/try/download/community
2. Start MongoDB service (usually automatic)
3. Use: `MONGODB_URI=mongodb://localhost:27017/strawberry_milkshake`

---

## Step 3: Frontend Setup (1 minute)

```powershell
# Navigate to frontend
cd "C:\Users\tbc21\OneDrive\Desktop\Website Practices\S1\Strawberry Milkshake Website"

# Install axios (already added to package.json)
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
```

---

## Step 4: Start Everything (1 minute)

### Terminal 1 - Backend

```powershell
cd "C:\Users\tbc21\OneDrive\Desktop\Website Practices\S1\backend"
npm run dev
```

**Expected output:**

```
Server running in development mode on port 5000
MongoDB Connected: cluster0-xxxxx.mongodb.net
```

### Terminal 2 - Frontend

```powershell
cd "C:\Users\tbc21\OneDrive\Desktop\Website Practices\S1\Strawberry Milkshake Website"
npm run dev
```

**Expected output:**

```
- ready started server on 0.0.0.0:3000
```

---

## Step 5: Test It! (30 seconds)

1. **Open browser:** http://localhost:3000/register
2. **Create account:**
   - Username: testuser
   - Email: test@example.com
   - Password: Test@123456 (must meet requirements!)
3. **Success!** You should be redirected to the home page, logged in

### Test the API Directly

```powershell
# Health check
curl http://localhost:5000/health

# Expected: {"success":true,"message":"Server is running",...}
```

---

## 🎉 You're Done!

Your secure backend is now running with:

- ✅ JWT authentication
- ✅ Password encryption
- ✅ Rate limiting
- ✅ Input validation
- ✅ Access control
- ✅ All OWASP Top 10 protections

---

## Common Issues & Fixes

### ❌ "MongoDB connection failed"

**Fix:** Check your `MONGODB_URI` in `.env`. For Atlas, ensure IP whitelist is set to `0.0.0.0/0` for development.

### ❌ "Invalid token" errors

**Fix:** Ensure `JWT_SECRET` in backend `.env` is set and server has restarted after changes.

### ❌ Frontend can't reach backend

**Fix:** Check `NEXT_PUBLIC_API_URL` in frontend `.env.local` is `http://localhost:5000/api`

### ❌ "Too many requests" message

**Fix:** Rate limit triggered. Wait 15 minutes or restart backend server.

---

## Next Steps

### Try These Features:

1. **Login/Logout Flow**
   - Navigate to http://localhost:3000/login
   - Login with your account
   - Logout and back in

2. **Password Reset**

   ```http
   POST http://localhost:5000/api/auth/forgot-password
   Content-Type: application/json

   {"email": "test@example.com"}
   ```

   Check server logs for reset link (email not configured yet)

3. **Protected Routes**
   - Try accessing `/api/users/profile` without login → Should fail
   - Login first, then access → Should work

4. **Create Admin User**
   - Register a new user
   - Use MongoDB Compass or Atlas UI
   - Find user in `users` collection
   - Change `role` field to `"admin"`
   - Now test admin endpoints!

---

## 📚 Full Documentation

- **API Reference**: `backend/README.md`
- **MongoDB Setup**: `backend/docs/mongodb-setup.md`
- **Security Guide**: `backend/docs/security-checklist.md`
- **Full Walkthrough**: Check the artifacts

---

## 🆘 Need Help?

1. Check the console logs in both terminal windows
2. Review the comprehensive walkthrough document
3. Check MongoDB connection in Atlas dashboard
4. Verify all environment variables are set correctly
5. Ensure both servers are running

---

## 🔒 Security Reminder

**Development Mode:**

- ✅ CORS allows localhost
- ✅ Detailed error messages
- ✅ Debug logging enabled

**Before Production:**

- ⚠️ Change ALL secrets in `.env`
- ⚠️ Set `NODE_ENV=production`
- ⚠️ Use HTTPS/SSL
- ⚠️ Configure CORS whitelist
- ⚠️ Set MongoDB IP whitelist to production IPs only
- ⚠️ Review `backend/docs/security-checklist.md`

---

**Happy coding! Your website is now secure! 🎉🔐**
