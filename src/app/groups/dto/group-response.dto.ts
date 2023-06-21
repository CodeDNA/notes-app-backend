import { PostItem } from './post.model';
import { Expose } from 'class-transformer';

export class GroupResponseDto {
  @Expose()
  groupId: string;

  @Expose()
  creatorId: string;

  @Expose()
  ownerId: string;

  @Expose()
  groupTitle: string;

  @Expose()
  totalMembers: number;

  @Expose()
  members: Array<string>;

  @Expose()
  groupPictureUrl: string;

  @Expose()
  posts: PostItem[];

  @Expose()
  totalPosts: number;
}
