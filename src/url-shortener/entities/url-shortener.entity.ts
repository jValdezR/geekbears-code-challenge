import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

/**
 * Represents a schema for storing shortened URLs in the database.
 */
@Schema()
export class UrlShortener extends Document {
    /**
     * Unique code associated with the shortened URL.
     *
     * @example "abc123"
     */
    @Prop({
        unique: true,
        index: true
    })
    code: string;

    /**
     * The original URL that has been shortened.
     *
     * @example "https://example.com/long-url"
     */
    @Prop({
        unique: true,
        index: true
    })
    url: string;
}

/**
 * Mongoose schema factory for the UrlShortener class.
 */
export const UrlShortenerSchema = SchemaFactory.createForClass(UrlShortener);
