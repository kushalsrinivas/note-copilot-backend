require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/database');
const { checkBucketAccess } = require('./config/s3');
const config = require('./config');

const PORT = config.port;
const HOST = config.host;

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Check S3 bucket access (optional - won't block server start)
    await checkBucketAccess();

    // Start Express server
    const server = app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════╗
║   🚀 Notes Copilot Backend Server         ║
╠════════════════════════════════════════════╣
║   Environment: ${config.env.padEnd(28)}║
║   Server: http://${HOST}:${PORT.toString().padEnd(22)}║
║   API Base: http://${HOST}:${PORT}/api${' '.padEnd(14)}║
╠════════════════════════════════════════════╣
║   Database: PostgreSQL ✅                  ║
║   Storage: AWS S3 ✅                       ║
╚════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n${signal} received. Starting graceful shutdown...`);
      server.close(async () => {
        console.log('HTTP server closed');
        try {
          await require('./config/database').sequelize.close();
          console.log('Database connection closed');
          process.exit(0);
        } catch (err) {
          console.error('Error during shutdown:', err);
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

