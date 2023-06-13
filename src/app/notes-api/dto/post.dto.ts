import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { randomUUID } from 'crypto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto extends Document {
  @Prop({
    type: String,
    required: true,
    immutable: true,
    default: () => randomUUID(),
  })
  postId: string = randomUUID();

  @Prop({ type: String, required: true })
  posterId: string;

  @Prop({ type: String, required: true })
  groupId: string;

  @Prop({ type: String, required: false })
  completerId: string;

  @Prop({ type: String, required: false })
  content: string;
}
