import { IsJWT, IsString, IsUrl, MinLength } from "class-validator";



/**
 * Data Transfer Object (DTO) for creating a shortened URL.
 */
export class CreateUrlShortenerDto {
    /**
     * The original URL to be shortened.
     *
     * @example "https://example.com"
     */
    @IsString()
    @MinLength(3)
    @IsUrl()
    url: string;
  
    /**
     * JWT (JSON Web Token) for authentication.
     *
     * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     */
    @IsString()
    @IsJWT()
    token: string;
  }
  