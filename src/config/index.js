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

  // AWS S3
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3BucketName: process.env.S3_BUCKET_NAME || 'notes-copilot-audio',
    s3Endpoint: process.env.S3_ENDPOINT,
    s3ForcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
  },

  // Application
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760,
  allowedAudioFormats: (process.env.ALLOWED_AUDIO_FORMATS || 'audio/mpeg,audio/wav,audio/mp3,audio/m4a,audio/ogg').split(','),
};

module.exports = config;

