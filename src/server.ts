import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import subscribeToEvents from './app/events';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';
import { RedisClient } from './shared/redis';

// uncaught exceptions error handling
process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;
// database connection
async function bootstrap() {
  try {
    await RedisClient.connect().then(() => {
      subscribeToEvents();
    });
    await mongoose.connect(config.database_url as string);
    logger.info('👋 Database Connection successful');
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('failed to connect', error);
  }

  // unhandled Rejection errors (from promise && async tasks)
  process.on('unhandledRejection', error => {
    if (server) {
      server.close();
      errorLogger.error(error);
      process.exit(1);
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

// SIGTERM  signals error handling
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
