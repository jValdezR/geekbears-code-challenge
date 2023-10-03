
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';
import { UrlShortener } from './entities/url-shortener.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/**
 * Service responsible for URL shortening and decoding operations.
 */
@Injectable()
export class UrlShortenerService {
  constructor(
    @InjectModel(UrlShortener.name)
    private readonly urlShortenerModel: Model<UrlShortener>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Encode a URL and generate a short URL code.
   *
   * @param {CreateUrlShortenerDto} createUrlShortenerDto - DTO containing the original URL and authentication token.
   * @returns {Promise<Object>} - Returns an object containing the short URL.
   * @throws {InternalServerErrorException} - Throws an error if the server encounters an issue.
   */
  async encode(createUrlShortenerDto: CreateUrlShortenerDto) {
    try {
      // Verify the authentication token
      await this.jwtService.verifyAsync(createUrlShortenerDto.token);

      // Generate a random short URL code
      const code = Math.random().toString(36).substring(2, 10);

      // Create a new URLShortener document in the database
      await this.urlShortenerModel.create({ code, url: createUrlShortenerDto.url });

      return { url: `http://gb.shrt/${code}` };
    } catch (error) {
      throw new InternalServerErrorException('Server Error - Check Logs');
    }
  }

  /**
   * Decode a short URL code back to its original URL.
   *
   * @param {CreateUrlShortenerDto} createUrlShortenerDto - DTO containing the short URL code and authentication token.
   * @returns {Promise<Object>} - Returns an object containing the original URL.
   * @throws {BadRequestException} - Throws an error if the URL is not found in the database.
   */
  async decode(createUrlShortenerDto: CreateUrlShortenerDto) {
    try {
      // Verify the authentication token
      await this.jwtService.verifyAsync(createUrlShortenerDto.token);

      // Extract the short code from the provided URL
      const shortCode = createUrlShortenerDto.url.split('/').pop();

      // Find the original URL in the database using the short code
      const originalUrl = await this.urlShortenerModel.findOne({ code: shortCode });

      if (!originalUrl) {
        throw new BadRequestException('URL not found');
      }

      return { url: originalUrl.url };
    } catch (error) {
      throw new BadRequestException('URL not found');
    }
  }
}
