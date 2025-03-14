import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = new Logger('Bootstrap');

  // Enable graceful shutdown hooks
  app.enableShutdownHooks();

  // Attempt to connect to the database
  try {
    // Replace this with your actual database connection logic
    // For example, if you're using TypeORM:
    // await app.get(Connection).connect();
    logger.log('Database connection established successfully.');
  } catch (error) {
    logger.error('Failed to connect to the database.', error.stack);
    process.exit(1); // Exit the application if the database connection fails
  }

  const port = 3000;
  await app.listen(port);
  logger.log(`Server is running on http://localhost:${port}`);
}

bootstrap();
