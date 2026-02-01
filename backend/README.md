# Strawberry Milkshake Backend API

A secure, production-ready backend API built with Node.js, Express, and MongoDB.

## 🔒 Security Features

- **Authentication**: JWT-based authentication with access and refresh tokens
- **Authorization**: Role-based access control (User, Moderator, Admin)
- **Password Security**: Bcrypt hashing with cost factor 12
- **Rate Limiting**: Tiered rate limits to prevent abuse
- **Input Validation**: Comprehensive validation and sanitization
- **Security Headers**: Helmet.js for HTTP security headers
- **CORS Protection**: Whitelist-based CORS configuration
- **NoSQL Injection Prevention**: MongoDB sanitization middleware
- **XSS Protection**: Input sanitization against cross-site scripting
- **HPP Protection**: HTTP Parameter Pollution prevention
- **Account Lockout**: Automatic lockout after failed login attempts
- **Secure Logging**: Winston logging without sensitive data exposure

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or Atlas)
- npm >= 9.0.0

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

**Required environment variables:**

```env
# Generate secure secrets:
# Option 1: Use Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: Use OpenSSL
openssl rand -hex 64

# Update .env with generated values
JWT_SECRET=<your-generated-secret>
JWT_REFRESH_SECRET=<another-generated-secret>
SESSION_SECRET=<another-generated-secret>

# MongoDB URI
MONGODB_URI=mongodb://localhost:27017/strawberry_milkshake
# OR for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/strawberry_milkshake
```

### 3. Start Server

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecureP@ss123",
  "confirmPassword": "SecureP@ss123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "...",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user"
    },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecureP@ss123"
}
```

#### Refresh Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer <access-token>
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <access-token>
```

#### Forgot Password

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "password": "NewSecureP@ss123",
  "confirmPassword": "NewSecureP@ss123"
}
```

### User Endpoints

#### Get Profile

```http
GET /api/users/profile
Authorization: Bearer <access-token>
```

#### Update Profile

```http
PUT /api/users/profile
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

#### Change Password

```http
PUT /api/users/change-password
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "currentPassword": "OldP@ss123",
  "newPassword": "NewP@ss123",
  "confirmPassword": "NewP@ss123"
}
```

#### Delete Account

```http
DELETE /api/users/profile
Authorization: Bearer <access-token>
```

### Admin Endpoints

#### Get All Users (Admin/Moderator)

```http
GET /api/users?page=1&limit=10
Authorization: Bearer <admin-access-token>
```

#### Update User Role (Admin only)

```http
PUT /api/users/:id/role
Authorization: Bearer <admin-access-token>
Content-Type: application/json

{
  "role": "moderator"
}
```

#### Delete User (Admin only)

```http
DELETE /api/users/:id
Authorization: Bearer <admin-access-token>
```

## 🛡️ Security Best Practices

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%\*?&)

### Rate Limits

- **General API**: 100 requests per 15 minutes
- **Auth endpoints**: 5 requests per 15 minutes
- **Password reset**: 3 requests per hour
- **Sensitive operations**: 10 requests per 15 minutes

### Account Lockout

- Locks after 5 failed login attempts
- Lockout duration: 15 minutes
- Automatic unlock after duration expires

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js      # MongoDB connection
│   │   └── security.js      # Security configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── userController.js    # User management
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── errorHandler.js      # Error handling
│   │   ├── rateLimiter.js       # Rate limiting
│   │   └── validator.js         # Input validation
│   ├── models/
│   │   └── User.js              # User schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── user.js              # User routes
│   ├── utils/
│   │   └── logger.js            # Winston logger
│   └── server.js                # App entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚢 Deployment

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses (or allow from anywhere: 0.0.0.0/0)
5. Get connection string and update `MONGODB_URI` in `.env`

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=<your-atlas-connection-string>
JWT_SECRET=<secure-random-string>
JWT_REFRESH_SECRET=<another-secure-random-string>
FRONTEND_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com
```

### Deployment Platforms

**Recommended platforms:**

- Heroku
- Railway
- DigitalOcean App Platform
- AWS EC2
- Google Cloud Platform

### Example: Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set NODE_ENV=production
railway variables set MONGODB_URI=<your-uri>
# ... add other variables

# Deploy
railway up
```

## 🔧 Troubleshooting

### MongoDB Connection Issues

```
Error: connect ECONNREFUSED
```

**Solution**: Ensure MongoDB is running locally or your Atlas connection string is correct.

### JWT Token Errors

```
Error: Invalid token
```

**Solution**: Check that JWT_SECRET in `.env` matches the one used to sign tokens.

### Rate Limit Issues

```
Error: Too many requests
```

**Solution**: Wait for the rate limit window to reset or adjust limits in `src/config/security.js`.

## 📝 License

MIT

## 👤 Author

Your Name

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
