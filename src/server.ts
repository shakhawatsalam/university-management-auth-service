import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { logger, errorLogger } from './shared/logger';

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('👋 Database Connection successful');
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('failed to connect', error);
  }
}
bootstrap();
