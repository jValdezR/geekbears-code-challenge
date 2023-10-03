

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { ConfigModule } from '@nestjs/config';

/**
 * Main application module that imports other feature modules.
 */
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL), // Connect to the database using the URL from environment variables.
    UsersModule, // Import the UsersModule for user-related functionality.
    UrlShortenerModule, // Import the UrlShortenerModule for URL shortening functionality.
  ],
})
export class AppModule {}
