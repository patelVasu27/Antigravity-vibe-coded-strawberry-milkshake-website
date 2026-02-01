# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended for Production)

### Step 1: Create Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Verify your email

### Step 2: Create Cluster

1. Click "Build a Database"
2. Choose "Shared" (Free tier)
3. Select your cloud provider and region
4. Click "Create Cluster"

### Step 3: Create Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose authentication method: Password
4. Enter username and strong password
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your server's IP address
5. Click "Confirm"

### Step 5: Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select Driver: Node.js
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `strawberry_milkshake`

Example connection string:

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/strawberry_milkshake?retryWrites=true&w=majority
```

### Step 6: Update .env File

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/strawberry_milkshake?retryWrites=true&w=majority
```

### Security Best Practices for Atlas

1. **Enable Encryption at Rest**
   - Go to Cluster settings
   - Enable "Encryption at Rest"

2. **Enable Auditing** (Paid tiers)
   - Track all database operations
   - Monitor suspicious activity

3. **Regular Backups**
   - Atlas automatically creates backups
   - Configure backup schedule in cluster settings

4. **IP Whitelist Management**
   - Only whitelist necessary IP addresses
   - Update when server IP changes

---

## Option 2: Local MongoDB Installation

### Windows Installation

1. **Download MongoDB**
   - Go to [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Select Windows version
   - Download MSI installer

2. **Install MongoDB**
   - Run the installer
   - Choose "Complete" installation
   - Install as a Windows Service
   - Install MongoDB Compass (GUI tool)

3. **Verify Installation**

   ```powershell
   mongod --version
   ```

4. **Start MongoDB Service**
   - Open Services (services.msc)
   - Find "MongoDB Server"
   - Right-click → Start

5. **Connection String for Local**
   ```env
   MONGODB_URI=mongodb://localhost:27017/strawberry_milkshake
   ```

### macOS Installation

```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Connection string
MONGODB_URI=mongodb://localhost:27017/strawberry_milkshake
```

### Linux Installation (Ubuntu)

```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Reload package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Connection string
MONGODB_URI=mongodb://localhost:27017/strawberry_milkshake
```

---

## Local MongoDB Security Configuration

### 1. Enable Authentication

Edit MongoDB configuration file:

**Windows**: `C:\Program Files\MongoDB\Server\6.0\bin\mongod.cfg`
**macOS/Linux**: `/usr/local/etc/mongod.conf` or `/etc/mongod.conf`

```yaml
security:
  authorization: enabled
```

### 2. Create Admin User

```javascript
// Connect to MongoDB shell
mongosh

// Switch to admin database
use admin

// Create admin user
db.createUser({
  user: "admin",
  pwd: "SecureAdminPassword123!",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }
  ]
})
```

### 3. Create Application User

```javascript
// Switch to your database
use strawberry_milkshake

// Create app user with limited privileges
db.createUser({
  user: "appuser",
  pwd: "SecureAppPassword123!",
  roles: [
    { role: "readWrite", db: "strawberry_milkshake" }
  ]
})
```

### 4. Update Connection String

```env
MONGODB_URI=mongodb://appuser:SecureAppPassword123!@localhost:27017/strawberry_milkshake?authSource=strawberry_milkshake
```

### 5. Restart MongoDB

**Windows**: Restart MongoDB service in Services
**macOS**: `brew services restart mongodb-community`
**Linux**: `sudo systemctl restart mongod`

---

## Database Schema & Indexes

The application will automatically create necessary indexes when the User model is used. However, you can manually create them for optimization:

```javascript
// Connect to your database
use strawberry_milkshake

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ username: 1 }, { unique: true })
db.users.createIndex({ resetPasswordToken: 1 })
db.users.createIndex({ emailVerificationToken: 1 })
db.users.createIndex({ createdAt: -1 })
db.users.createIndex({ isActive: 1, role: 1 })
```

---

## Backup & Restore

### Backup Database

```bash
# Local MongoDB
mongodump --db strawberry_milkshake --out ./backup

# With authentication
mongodump --uri="mongodb://appuser:password@localhost:27017/strawberry_milkshake" --out ./backup
```

### Restore Database

```bash
# Local MongoDB
mongorestore --db strawberry_milkshake ./backup/strawberry_milkshake

# With authentication
mongorestore --uri="mongodb://appuser:password@localhost:27017/strawberry_milkshake" ./backup/strawberry_milkshake
```

### Atlas Backups

- Automatic continuous backups
- Point-in-time recovery (Paid tiers)
- Download backups from Atlas UI

---

## Monitoring

### MongoDB Compass

1. Download from [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. View collections, documents, and performance

### Atlas Monitoring

- Real-time performance metrics
- Query performance insights
- Slow query analyzer
- Connection monitoring
- Storage usage tracking

---

## Troubleshooting

### Connection Refused Error

```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

1. Ensure MongoDB service is running
2. Check if port 27017 is in use by another process
3. Verify connection string is correct

### Authentication Failed

```
MongoServerError: Authentication failed
```

**Solutions:**

1. Verify username and password in connection string
2. Check if `authSource` is specified correctly
3. Ensure user exists in the database

### Atlas IP Whitelist Error

```
MongoServerSelectionError: connection refused
```

**Solutions:**

1. Add your IP to Atlas whitelist
2. Use 0.0.0.0/0 for development (not recommended for production)
3. Check if VPN is blocking connection

---

## Production Checklist

- [ ] Use MongoDB Atlas or managed MongoDB service
- [ ] Enable authentication
- [ ] Use strong passwords
- [ ] Configure IP whitelist
- [ ] Enable encryption at rest
- [ ] Enable encryption in transit (TLS/SSL)
- [ ] Set up automated backups
- [ ] Configure monitoring and alerts
- [ ] Use separate databases for dev/staging/production
- [ ] Implement proper connection pooling
- [ ] Set up replica sets for high availability
- [ ] Review and optimize indexes
