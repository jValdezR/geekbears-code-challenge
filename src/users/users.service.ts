
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Service responsible for user-related operations, such as registration and authentication.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Find a user by their email address.
   *
   * @param {string} email - User's email address.
   * @returns {Promise<User | null>} - Returns the user or null if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  /**
   * Validate user credentials.
   *
   * @param {object} credentials - User's email and password for authentication.
   * @returns {Promise<User>} - Returns the authenticated user.
   * @throws {UnauthorizedException} - Throws an error if credentials are invalid.
   */
  async validateUser({ email, password }) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  /**
   * Create a new user and return an authentication token.
   *
   * @param {CreateUserDto} createUserDto - DTO containing user registration data.
   * @returns {Promise<{ token: string }>} - Returns an object with an authentication token.
   * @throws {ConflictException} - Throws an error if a user with the same email already exists.
   */
  async create(createUserDto: CreateUserDto): Promise<{ token: string }> {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    const newUser = await this.userModel.create(createUserDto);

    const payload = { email: newUser.email, sub: newUser._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * Log in a user and return an authentication token.
   *
   * @param {CreateUserDto} createUserDto - DTO containing user login data.
   * @returns {Promise<{ token: string }>} - Returns an object with an authentication token.
   * @throws {UnauthorizedException} - Throws an error if authentication fails.
   */
  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(createUserDto);

    const payload = { email: user.email, sub: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
