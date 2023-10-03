

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

/**
 * Represents a schema for storing user information in the database.
 */
@Schema()
export class User extends Document {
  /**
   * User's email address.
   *
   * @example "user@example.com"
   */
  @Prop({
    unique: true,
    index: true
  })
  email: string;

  /**
   * User's password (hashed or encrypted).
   * Actual password storage and encryption method may vary.
   */
  @Prop({})
  password: string;
}

/**
 * Mongoose schema factory for the User class.
 */
export const UserSchema = SchemaFactory.createForClass(User);
