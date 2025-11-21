# Notes Copilot Backend

A Node.js backend API for Notes Copilot with PostgreSQL database and AWS S3 storage for audio files.

## 🚀 Features

- **Express.js** REST API
- **PostgreSQL** database with Sequelize ORM
- **AWS S3** integration for audio file storage
- **Docker** support for PostgreSQL
- Organized MVC structure (Models, Controllers, Routes)
- Error handling and validation middleware
- File upload with Multer and S3
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
- AWS Account with S3 bucket
- npm or yarn

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
   
   Edit `.env` and configure:
   - Database credentials
   - AWS credentials and S3 bucket name
   - Server port and other settings

4. **Start PostgreSQL with Docker**
   ```bash
   npm run docker:up
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🐳 Docker Commands

```bash
# Start PostgreSQL container
npm run docker:up

# Stop PostgreSQL container
npm run docker:down

# View PostgreSQL logs
npm run docker:logs
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

### AWS S3 Configuration
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `S3_BUCKET_NAME` - S3 bucket name

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

The application uses Multer with S3 storage for handling audio file uploads.

### S3 Utilities

The `src/config/s3.js` file provides:
- `upload` - Multer middleware for file uploads
- `getSignedUrl(key, expiresIn)` - Generate signed URLs for file downloads
- `deleteFile(key)` - Delete files from S3
- `checkBucketAccess()` - Verify S3 bucket accessibility

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
- Private S3 objects with signed URLs

## 📄 License

ISC

## 👥 Contributing

Please tell me more about your project requirements, and I'll help you add the specific models, controllers, and routes you need!
