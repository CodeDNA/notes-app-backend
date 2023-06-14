import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  autoCreate: true,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class UserDto extends Document {
  // todo: Rename UserDto -> User and move this to Schema folder. Create a dto folder for dtos and update the imports.
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: false })
  middleName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, lowercase: true })
  email: string;

  @Prop({ type: String, required: false })
  phoneNumber: number;

  @Prop({ type: Boolean, required: true, default: false })
  isDeleted: boolean;

  @Prop({ type: [String], required: false })
  groups: string[];

  @Prop({ type: String, required: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDto).index({
  userId: 1,
  email: 1,
});
