import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  autoCreate: true,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class User {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true, unique: true })
  userName: string;

  @Prop({ type: String, required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: false })
  middleName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: false })
  phoneNumber: number;

  @Prop({ type: Boolean, required: true, default: false })
  isDeleted = false;

  @Prop({ type: [String], required: false })
  groups: string[];

  @Prop({ type: String, required: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User).index({ userId: 1, userName: 1, email: 1 }, { unique: true });
