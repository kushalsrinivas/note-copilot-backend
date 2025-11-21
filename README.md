# Notes Copilot Backend

A Node.js backend API for Notes Copilot with PostgreSQL database and AWS S3 storage for audio files.

## 🚀 Features

- **Express.js** REST API
- **PostgreSQL** database with Sequelize ORM
- **MinIO** (S3-compatible) for local audio file storage
- **Docker** support for PostgreSQL and MinIO
- Organized MVC structure (Models, Controllers, Routes)
- Error handling and validation middleware
- File upload with Multer and S3-compatible storage
- Environment-based configuration
- Health check endpoints

## 📁 Project Structure

```
notes-copilot-backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.js   # Database connection setup
│   │   ├── s3.js         # S3 configuration and utilities
│   │   └── index.js      # Main config export
│   ├── models/           # Sequelize models
│   │   └── index.js      # Models index
│   ├── controllers/      # Route controllers
│   ├── routes/           # API routes
│   │   └── index.js      # Main routes
│   ├── middleware/       # Express middleware
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── utils/            # Utility functions
│   │   ├── asyncHandler.js
│   │   └── response.js
│   ├── app.js            # Express app setup
│   └── server.js         # Server entry point
├── database/
│   └── init/             # Database initialization scripts
├── docker-compose.yml    # Docker configuration
├── package.json
├── .env.example          # Example environment variables
└── README.md
```

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn

**Note:** No AWS account needed! We use MinIO for local S3-compatible storage.

## 📦 Installation

1. **Clone the repository**
   ```bash
   cd /Users/kushalsrinivas/apps/notes-copilot-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   The `.env` file comes pre-configured for local development with MinIO.
   You can customize:
   - Database credentials (optional)
   - MinIO credentials (optional)
   - Server port and other settings

4. **Start PostgreSQL and MinIO with Docker**
   ```bash
   npm run docker:up
   ```
   
   This will start:
   - PostgreSQL on port 5432
   - MinIO API on port 9000
   - MinIO Console on port 9001 (Web UI: http://localhost:9001)
   
   MinIO will automatically create the `notes-copilot-audio` bucket.

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🐳 Docker Commands

```bash
# Start all containers (PostgreSQL + MinIO)
npm run docker:up

# Stop all containers
npm run docker:down

# View logs
npm run docker:logs

# Access MinIO Web Console
# Open http://localhost:9001
# Login: minioadmin / minioadmin
```

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure the following:

### Server Configuration
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: localhost)

### Database Configuration
- `DB_HOST` - PostgreSQL host (default: localhost)
- `DB_PORT` - PostgreSQL port (default: 5432)
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password

### MinIO Configuration (Local S3)
- `MINIO_ROOT_USER` - MinIO admin username (default: minioadmin)
- `MINIO_ROOT_PASSWORD` - MinIO admin password (default: minioadmin)
- `MINIO_PORT` - MinIO API port (default: 9000)
- `MINIO_CONSOLE_PORT` - MinIO Console port (default: 9001)

### S3 Configuration (MinIO-compatible)
- `S3_ENDPOINT` - MinIO endpoint (default: http://localhost:9000)
- `AWS_ACCESS_KEY_ID` - MinIO access key (same as MINIO_ROOT_USER)
- `AWS_SECRET_ACCESS_KEY` - MinIO secret key (same as MINIO_ROOT_PASSWORD)
- `AWS_REGION` - Region (default: us-east-1, can be any value for MinIO)
- `S3_BUCKET_NAME` - Bucket name (default: notes-copilot-audio)

### Application Settings
- `MAX_FILE_SIZE` - Maximum file size in bytes (default: 10MB)
- `ALLOWED_AUDIO_FORMATS` - Comma-separated list of allowed audio MIME types

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns server health status.

### API Info
```
GET /api
```
Returns API information and available endpoints.

## 🗄️ Database

The application uses PostgreSQL with Sequelize ORM. Models are defined in the `src/models/` directory.

### Database Sync
In development mode, Sequelize will automatically sync the database schema when the server starts.

## 📤 File Upload

The application uses Multer with MinIO (S3-compatible) storage for handling audio file uploads.

### MinIO Setup

MinIO provides a local S3-compatible storage solution:
- **API Endpoint**: http://localhost:9000
- **Console**: http://localhost:9001
- **Default Credentials**: minioadmin / minioadmin
- **Bucket**: notes-copilot-audio (auto-created)

### Storage Utilities

The `src/config/s3.js` file provides:
- `upload` - Multer middleware for file uploads to MinIO
- `getSignedUrl(key, expiresIn)` - Generate signed URLs for file downloads
- `deleteFile(key)` - Delete files from MinIO
- `checkBucketAccess()` - Verify MinIO bucket accessibility

All S3 SDK methods work seamlessly with MinIO!

## 🚦 Development

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

## 📝 Adding New Features

### Creating a Model

Create a new file in `src/models/`, for example `Note.js`:

```javascript
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
  });

  Note.associate = (models) => {
    // Define associations here
  };

  return Note;
};
```

### Creating a Controller

Create a new file in `src/controllers/`, for example `noteController.js`:

```javascript
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/response');

exports.getAllNotes = asyncHandler(async (req, res) => {
  // Controller logic here
  successResponse(res, [], 'Notes retrieved successfully');
});
```

### Creating Routes

Create a new file in `src/routes/`, for example `notes.js`:

```javascript
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/', noteController.getAllNotes);

module.exports = router;
```

Then import in `src/routes/index.js`:

```javascript
router.use('/notes', require('./notes'));
```

## 🔒 Security

- Helmet.js for security headers
- CORS configuration
- Input validation with express-validator
- File type and size restrictions
- Private MinIO objects with signed URLs
- Local storage (no external cloud dependencies)

## 📄 License

ISC

## 👥 Contributing

Please tell me more about your project requirements, and I'll help you add the specific models, controllers, and routes you need!
