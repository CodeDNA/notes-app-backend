import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostItem } from './post.model';

@Schema({
  autoCreate: true,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Group {
  @Prop({ type: String, required: true, immutable: true })
  groupId: string;

  @Prop({ type: String, required: true, immutable: true })
  creatorId: string;

  @Prop({ type: String, required: true })
  ownerId: string;

  @Prop({ type: String, required: true })
  groupTitle: string;

  @Prop({ type: Number, required: true, default: 1 })
  totalMembers: number;

  /*
    Id's of users associated with this group | By default ownerId = creatorId will be always here. So the group can't have 0 users. | Creator can't be deleted (can be replaced by the creator itself).
    Any member of the group can add new members. Only the owner of the group can remove a member.
  */
  @Prop({ type: [String], required: true })
  members: Array<string>;

  @Prop({ type: String, required: false, lowercase: true })
  groupPictureUrl = '';

  @Prop({ type: Array<PostItem>, required: false })
  posts: PostItem[];

  @Prop({ type: Number, required: false, default: 0 })
  totalPosts: number;

  @Prop({ type: Boolean, required: true, default: 0 })
  isDeleted = false;
}

export const GroupsSchema = SchemaFactory.createForClass(Group).index({ groupId: 1 }, { unique: true }).index({ ownerId: 1 });
