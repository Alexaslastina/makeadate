import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class UserEntity {
  @Prop({ unique: true, required: true, lowercase: true, trim: true }) email!: string;
  @Prop({ required: true }) passwordHash!: string;
  @Prop({ default: 'customer' }) role!: 'customer' | 'admin';
  @Prop() name?: string;
}

export type UserDocument = HydratedDocument<UserEntity>;
export const UserSchema = SchemaFactory.createForClass(UserEntity);

// Alias for consistency
export const User = UserEntity;

