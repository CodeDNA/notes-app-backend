import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export class PostDto extends Document {
  @Prop({
    type: String,
    required: true,
    immutable: true,
    default: () => uuid(),
  })
  postId: string = uuid();

  @Prop({ type: String, required: true })
  posterId: string;

  @Prop({ type: String, required: true })
  groupId: string;

  @Prop({ type: String, required: false })
  completerId: string;

  @Prop({ type: String, required: false })
  content: string;
}
