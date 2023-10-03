import { IsString, MinLength} from "class-validator";



/**
 * Data Transfer Object (DTO) for creating a new user.
 */
export class CreateUserDto {
    /**
     * User's email address.
     * Must be a string with a minimum length of 10 characters.
     *
     * @example "user@example.com"
     */
    @IsString()
    @MinLength(10)
    email: string;
  
    /**
     * User's password.
     * Must be a string with a minimum length of 10 characters.
     *
     * @example "P@ssw0rd1"
     */
    @IsString()
    @MinLength(10)
    password: string;
  }
  