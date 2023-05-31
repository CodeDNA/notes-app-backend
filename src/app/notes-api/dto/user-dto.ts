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
  @Prop({ type: String, required: false })
  userId: string;

  @Prop({ type: String, required: false })
  userName: string;

  @Prop({ type: String, required: false })
  firstName: string;

  @Prop({ type: String, required: false })
  middleName: string;

  @Prop({ type: String, required: false })
  LastName: string;

  @Prop({ type: String, required: false })
  email: String;

  @Prop({ type: String, required: false })
  phoneNumber: number;

  @Prop({ type: Boolean, required: false })
  isDeleted: boolean;

  @Prop({ type: Array<String>, required: false })
  groups: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserDto).index({
  userId: 1,
});
