import { Prop } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class PostItem {
  //TODO: Convert to a dto (currently a mongoose model)
  @Prop({
    type: String,
    immutable: true,
  })
  @IsString()
  postId: string = uuid();

  @Prop({ type: Date, required: false, immutable: true })
  createdAt: Date = new Date();

  @Prop({ type: Date, required: false, immutable: true })
  lastUpdatedAt: Date = null;

  @Prop({ type: String, required: true })
  posterId: string;

  @Prop({ type: String, required: true })
  groupId: string;

  @Prop({ type: String, required: false })
  completerId = '';

  @Prop({ type: Date, required: false })
  completionDate: Date = null;

  @Prop({ type: String, required: false })
  content: string;
}
