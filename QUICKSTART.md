# 🚀 Quick Start Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual credentials
# Required changes:
# - AWS_ACCESS_KEY_ID
# - AWS_SECRET_ACCESS_KEY
# - S3_BUCKET_NAME
# Optional: Adjust database credentials if needed
```

## Step 3: Start PostgreSQL Database
```bash
# Start PostgreSQL in Docker
npm run docker:up

# Verify it's running
docker ps
```

## Step 4: Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

## Step 5: Test the API
Open your browser or use curl:

```bash
# Health check
curl http://localhost:3000/api/health

# API info
curl http://localhost:3000/api
```

You should see JSON responses confirming the server is running!

## 🎯 Next Steps

Now that your backend is initialized and running, you can:

1. **Define your models** in `src/models/`
2. **Create controllers** in `src/controllers/`
3. **Add routes** in `src/routes/`
4. **Configure your S3 bucket** in AWS console

## 📋 Useful Commands

```bash
# View PostgreSQL logs
npm run docker:logs

# Stop PostgreSQL
npm run docker:down

# Access PostgreSQL CLI
docker exec -it notes-copilot-postgres psql -U notesapp -d notes_copilot
```

## ⚠️ Troubleshooting

### Database connection errors
- Ensure Docker is running
- Check if PostgreSQL container is running: `docker ps`
- Verify .env database credentials match docker-compose.yml

### S3 errors
- Verify AWS credentials in .env
- Ensure S3 bucket exists and is accessible
- Check bucket region matches AWS_REGION in .env

### Port already in use
- Change PORT in .env to a different port
- Or stop the process using port 3000

---

**Ready to tell me about your project requirements so I can help you build the specific models and controllers you need!** 🎉

