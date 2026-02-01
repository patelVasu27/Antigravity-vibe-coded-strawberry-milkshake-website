# Quick Setup Script for Backend

Write-Host "🚀 Setting up Strawberry Milkshake Backend..." -ForegroundColor Cyan
Write-Host ""

# Navigate to backend directory
Set-Location "C:\Users\tbc21\OneDrive\Desktop\Website Practices\S1\backend"

# Check if Node.js is installed
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Copy environment template
Write-Host ""
Write-Host "⚙️  Setting up environment..." -ForegroundColor Yellow
if (-Not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env file from template" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔐 IMPORTANT: You need to configure the following in .env:" -ForegroundColor Magenta
    Write-Host "   1. Generate JWT secrets (run: node -e `"console.log(require('crypto').randomBytes(64).toString('hex'))`")" -ForegroundColor White
    Write-Host "   2. Set MongoDB connection URI (MONGODB_URI)" -ForegroundColor White
    Write-Host "   3. Update FRONTEND_URL if different from default" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "⚠️  .env file already exists, skipping..." -ForegroundColor Yellow
}

# Create logs directory
Write-Host "📁 Creating logs directory..." -ForegroundColor Yellow
if (-Not (Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" | Out-Null
    Write-Host "✅ Created logs directory" -ForegroundColor Green
} else {
    Write-Host "✅ Logs directory already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✨ Backend setup complete!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Configure .env file with your secrets and MongoDB URI" -ForegroundColor White
Write-Host "   2. Ensure MongoDB is running (local or Atlas)" -ForegroundColor White
Write-Host "   3. Run: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "   - README.md - Full API documentation" -ForegroundColor White
Write-Host "   - docs/mongodb-setup.md - MongoDB setup guide" -ForegroundColor White
Write-Host ""
