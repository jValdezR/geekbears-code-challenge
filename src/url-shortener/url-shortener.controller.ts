import { Controller, Post, Body} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Import Swagger decorators
import { UrlShortenerService } from './url-shortener.service';
import { CreateUrlShortenerDto } from './dto/create-url-shortener.dto';

@Controller('url-shortener')
@ApiTags('URL Shortener') // Group related endpoints with a tag
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post('encode')
  @ApiOperation({ summary: 'Encode a URL' }) // Describe the operation
  @ApiResponse({ status: 201, description: 'URL encoded successfully' }) // Describe the response status
  async encodeUrl(@Body() createUrlShortenerDto: CreateUrlShortenerDto) {
    /**
     * Endpoint for encoding a URL and generating a short URL.
     *
     * @param {CreateUrlShortenerDto} createUrlShortenerDto - DTO containing the original URL and authentication token.
     * @returns {Promise<Object>} - Returns an object containing the short URL.
     *
     * @example
     * // Request body
     * {
     *   "url": "https://example.com/long-url",
     *   "token": "your-auth-token"
     * }
     *
     * // Response
     * {
     *   "shortUrl": "http://your-short-url.com/abc123"
     * }
     */
    return await this.urlShortenerService.encode(createUrlShortenerDto);
  }

  @Post('decode')
  @ApiOperation({ summary: 'Decode a short URL' })
  @ApiResponse({ status: 200, description: 'Original URL decoded' })
  async decodeUrl(@Body() body: CreateUrlShortenerDto) {
    /**
     * Endpoint for decoding a short URL back to its original URL.
     *
     * @param {CreateUrlShortenerDto} body - DTO containing the short URL code.
     * @returns {Promise<Object>} - Returns an object containing the original URL.
     *
     * @example
     * // Request body
     * {
     *   "code": "abc123"
     * }
     *
     * // Response
     * {
     *   "originalUrl": "https://example.com/long-url"
     * }
     */
    return await this.urlShortenerService.decode(body);
  }
}
