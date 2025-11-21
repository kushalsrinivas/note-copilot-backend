require('dotenv').config();

const config = {
  // Server
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 3000,
  host: process.env.HOST || 'localhost',

  // Database
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'notes_copilot',
    user: process.env.DB_USER || 'notesapp',
    password: process.env.DB_PASSWORD || 'notesapp123',
  },

  // MinIO (Local S3)
  minio: {
    rootUser: process.env.MINIO_ROOT_USER || 'minioadmin',
    rootPassword: process.env.MINIO_ROOT_PASSWORD || 'minioadmin',
    port: parseInt(process.env.MINIO_PORT) || 9000,
    consolePort: parseInt(process.env.MINIO_CONSOLE_PORT) || 9001,
  },

  // S3 Configuration (works with MinIO)
  s3: {
    endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'minioadmin',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'minioadmin',
    bucketName: process.env.S3_BUCKET_NAME || 'notes-copilot-audio',
    forcePathStyle: true, // Required for MinIO
  },

  // Application
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760,
  allowedAudioFormats: (process.env.ALLOWED_AUDIO_FORMATS || 'audio/mpeg,audio/wav,audio/mp3,audio/m4a,audio/ogg,audio/webm').split(','),
  corsOrigin: process.env.CORS_ORIGIN || '*',
};

module.exports = config;

