

import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShortener, UrlShortenerSchema } from './entities/url-shortener.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UrlShortenerController],
  providers: [UrlShortenerService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: UrlShortener.name,
        schema: UrlShortenerSchema
      }
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with your secret key
      signOptions: { expiresIn: '1h' },
    }),
  ]
})
export class UrlShortenerModule {}
