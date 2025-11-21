# 🗄️ MinIO Setup Guide

MinIO is an S3-compatible object storage server that runs locally. Perfect for development!

## 🚀 What is MinIO?

MinIO provides Amazon S3-compatible APIs without needing AWS. Your code works the same way with both!

## 📦 Included Services

When you run `npm run docker:up`, you get:

1. **MinIO Server** (Port 9000)
   - S3-compatible API endpoint
   - Used by your application for file operations

2. **MinIO Console** (Port 9001)
   - Web-based admin interface
   - View/manage buckets and files
   - Monitor storage usage

3. **MinIO Init** (One-time setup)
   - Automatically creates your bucket
   - Sets proper permissions
   - Exits after completion

## 🎯 Accessing MinIO

### MinIO Console (Web UI)
```bash
URL: http://localhost:9001
Username: minioadmin
Password: minioadmin
```

### MinIO API (Application)
```bash
Endpoint: http://localhost:9000
Access Key: minioadmin
Secret Key: minioadmin
Bucket: notes-copilot-audio
```

## 🔧 Configuration

MinIO settings are in `docker-compose.yml` and `.env`:

```yaml
# docker-compose.yml
minio:
  image: minio/minio:latest
  command: server /data --console-address ":9001"
  ports:
    - "9000:9000"  # API
    - "9001:9001"  # Console
```

```bash
# .env
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin
S3_ENDPOINT=http://localhost:9000
S3_BUCKET_NAME=notes-copilot-audio
```

## 📁 Bucket Management

### Auto-created Bucket
The `minio-init` service automatically creates `notes-copilot-audio` bucket with:
- Private access (no anonymous access)
- Ready for authenticated uploads/downloads

### Manual Bucket Creation
If you need to create additional buckets:

1. **Via Console**: http://localhost:9001 → Buckets → Create Bucket

2. **Via CLI** (in container):
```bash
docker exec notes-copilot-minio-init \
  mc mb myminio/my-new-bucket
```

## 🔐 Security

### Development (Current Setup)
- Default credentials: `minioadmin/minioadmin`
- Accessible only on localhost
- Perfect for development

### Production Considerations
If deploying MinIO to production:
1. Change `MINIO_ROOT_USER` and `MINIO_ROOT_PASSWORD`
2. Use strong passwords
3. Enable HTTPS/TLS
4. Restrict network access
5. Consider using IAM policies

## 📊 Monitoring Files

### Via Console
1. Go to http://localhost:9001
2. Login with minioadmin/minioadmin
3. Navigate to "Buckets" → "notes-copilot-audio"
4. Browse uploaded files

### Via Docker
```bash
# List all files in bucket
docker exec notes-copilot-minio \
  mc ls myminio/notes-copilot-audio/

# Get bucket info
docker exec notes-copilot-minio \
  mc du myminio/notes-copilot-audio/
```

## 🧪 Testing File Upload

You can test MinIO with curl:

```bash
# Upload a file (example - adjust for your API endpoint)
curl -X POST http://localhost:3000/api/upload \
  -F "audio=@test.mp3" \
  -H "Content-Type: multipart/form-data"
```

Then check MinIO Console to see your uploaded file!

## 🔄 Data Persistence

MinIO data is stored in a Docker volume:
```yaml
volumes:
  minio_data:
    driver: local
```

Your files persist even when containers restart. To completely reset:
```bash
npm run docker:down
docker volume rm notes-copilot-backend_minio_data
npm run docker:up
```

## 🐛 Troubleshooting

### MinIO won't start
```bash
# Check if port 9000 or 9001 is already in use
lsof -i :9000
lsof -i :9001

# Change ports in docker-compose.yml if needed
```

### Can't access Console
- Ensure container is running: `docker ps | grep minio`
- Check logs: `docker logs notes-copilot-minio`
- Try restarting: `npm run docker:down && npm run docker:up`

### Bucket not created
```bash
# Check init container logs
docker logs notes-copilot-minio-init

# Manually create bucket
docker exec notes-copilot-minio \
  mc mb myminio/notes-copilot-audio --ignore-existing
```

### Upload errors
- Verify S3_ENDPOINT is `http://localhost:9000` in .env
- Check MINIO credentials match in .env
- Ensure `s3ForcePathStyle: true` in S3 config
- Look at MinIO logs: `docker logs notes-copilot-minio`

## 🌐 Using Real AWS S3 Instead

If you want to use real AWS S3 in production:

1. **Update .env**:
```bash
S3_ENDPOINT=  # Remove or leave empty
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1  # Your actual region
S3_BUCKET_NAME=your-aws-bucket
```

2. **Update src/config/s3.js** (already configured to handle both):
```javascript
// Will use AWS S3 if S3_ENDPOINT is not set
// Will use MinIO if S3_ENDPOINT is set
```

3. **Stop MinIO** (optional):
```bash
docker-compose stop minio minio-init
```

The beauty of S3-compatible APIs: your code works with both! 🎉

## 📚 Resources

- [MinIO Documentation](https://docs.min.io/)
- [MinIO Client (mc) Guide](https://docs.min.io/docs/minio-client-complete-guide.html)
- [S3 API Compatibility](https://docs.min.io/docs/minio-server-limits-per-tenant.html)

---

**Enjoy local S3-compatible storage with MinIO!** 🚀

