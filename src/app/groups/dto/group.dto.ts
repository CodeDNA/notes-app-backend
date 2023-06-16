import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostDto } from './post.dto';

@Schema({
  autoCreate: true,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class GroupDto {
  @Prop({ type: String, required: true })
  groupId: string;

  @Prop({ type: String, required: true, immutable: true })
  creatorId: string;

  @Prop({ type: String, required: true })
  ownerId: string;

  @Prop({ type: String, required: true })
  groupTitle: string;

  @Prop({ type: Number, required: true, default: 1 })
  totalMembers: number;

  // . Id's of users associated with this group | By default creatorId will be always here. So the group can't have 0 users. | Creator can't be deleted (can be replaced by the creator itself).
  @Prop({ type: [String], required: true })
  members: Array<string>;

  @Prop({ type: String, required: false, lowercase: true })
  groupPictureUrl: string;

  @Prop({ type: Array<PostDto>, required: false })
  posts: PostDto[];

  @Prop({ type: Number, required: false, default: 0 })
  totalPosts: number;
}

export const GroupsSchema = SchemaFactory.createForClass(GroupDto).index({
  groupId: 1,
  ownerId: 1,
});
