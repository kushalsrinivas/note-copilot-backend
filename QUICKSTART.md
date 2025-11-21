# 🚀 Quick Start Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# The .env file is pre-configured for local development with MinIO
# No changes needed to get started!
# Optional: Adjust database or MinIO credentials if desired
```

## Step 3: Start PostgreSQL and MinIO
```bash
# Start PostgreSQL and MinIO in Docker
npm run docker:up

# Verify containers are running
docker ps

# You should see:
# - notes-copilot-postgres
# - notes-copilot-minio
# - notes-copilot-minio-init (will exit after creating bucket)
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

1. **Access MinIO Console**: http://localhost:9001 (minioadmin/minioadmin)
2. **Define your models** in `src/models/`
3. **Create controllers** in `src/controllers/`
4. **Add routes** in `src/routes/`
5. **Upload files** - they'll be stored in MinIO locally!

## 📋 Useful Commands

```bash
# View all container logs
npm run docker:logs

# Stop all containers
npm run docker:down

# Access PostgreSQL CLI
docker exec -it notes-copilot-postgres psql -U notesapp -d notes_copilot

# Access MinIO Console (Web UI)
open http://localhost:9001

# Check MinIO bucket status
docker exec notes-copilot-minio mc ls myminio/
```

## ⚠️ Troubleshooting

### Database connection errors
- Ensure Docker is running
- Check if PostgreSQL container is running: `docker ps`
- Verify .env database credentials match docker-compose.yml

### MinIO/Storage errors
- Check if MinIO container is running: `docker ps`
- Access MinIO console: http://localhost:9001
- Verify bucket exists in MinIO console
- Check S3_ENDPOINT is set to http://localhost:9000
- Ensure MINIO_ROOT_USER and MINIO_ROOT_PASSWORD match in .env

### Port already in use
- Change PORT in .env to a different port
- Or stop the process using port 3000

---

**Ready to tell me about your project requirements so I can help you build the specific models and controllers you need!** 🎉

