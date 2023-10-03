
import { Body, Controller, Post } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Controller responsible for user-related operations.
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Register a new user.
   *
   * @param {CreateUserDto} createUserDto - DTO containing user registration data.
   * @returns {Promise<Object>} - Returns an object with a registration success message.
   * @throws {Error} - Throws an error if registration fails.
   */
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    await this.usersService.create(createUserDto);
    return { message: 'User registered successfully' };
  }

  /**
   * User login endpoint.
   *
   * @param {CreateUserDto} createUserDto - DTO containing user login data.
   * @returns {Promise<Object>} - Returns an object with user authentication data.
   * @throws {Error} - Throws an error if authentication fails.
   */
  @Post('login')
  // @UseGuards(AuthGuard('local'))
  async login(@Body() createUserDto: CreateUserDto) {
    return this.usersService.login(createUserDto);
  }
}
