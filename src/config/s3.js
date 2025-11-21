const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

// Configure AWS SDK for MinIO
const s3Config = {
  endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.MINIO_ROOT_USER || 'minioadmin',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.MINIO_ROOT_PASSWORD || 'minioadmin',
  s3ForcePathStyle: true, // Required for MinIO
  signatureVersion: 'v4',
  region: process.env.AWS_REGION || 'us-east-1',
};

AWS.config.update(s3Config);

// Create S3 instance (works with MinIO)
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  ...s3Config,
});

console.log(`📦 S3 Client configured for: ${s3Config.endpoint}`);

// Multer configuration for S3 uploads
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME || 'notes-copilot-audio',
    acl: 'private',
    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: file.fieldname,
        uploadedBy: req.user?.id || 'anonymous',
        uploadedAt: new Date().toISOString(),
      });
    },
    key: (req, file, cb) => {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const extension = file.originalname.split('.').pop();
      const filename = `audio/${timestamp}-${randomString}.${extension}`;
      cb(null, filename);
    },
  }),
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedFormats = (process.env.ALLOWED_AUDIO_FORMATS || 'audio/mpeg,audio/wav,audio/mp3,audio/m4a,audio/ogg').split(',');
    
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed formats: ${allowedFormats.join(', ')}`), false);
    }
  },
});

/**
 * Get a signed URL for downloading a file from S3
 * @param {string} key - The S3 object key
 * @param {number} expiresIn - URL expiration time in seconds (default: 3600)
 * @returns {string} - Signed URL
 */
const getSignedUrl = (key, expiresIn = 3600) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME || 'notes-copilot-audio',
    Key: key,
    Expires: expiresIn,
  };
  return s3.getSignedUrl('getObject', params);
};

/**
 * Delete a file from S3
 * @param {string} key - The S3 object key
 * @returns {Promise}
 */
const deleteFile = async (key) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME || 'notes-copilot-audio',
    Key: key,
  };
  return s3.deleteObject(params).promise();
};

/**
 * Check if S3 bucket exists and is accessible
 * @returns {Promise<boolean>}
 */
const checkBucketAccess = async () => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME || 'notes-copilot-audio',
    };
    await s3.headBucket(params).promise();
    console.log('✅ S3 bucket is accessible');
    return true;
  } catch (error) {
    console.error('❌ S3 bucket access error:', error.message);
    return false;
  }
};

module.exports = {
  s3,
  upload,
  getSignedUrl,
  deleteFile,
  checkBucketAccess,
};

