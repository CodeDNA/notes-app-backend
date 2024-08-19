import { IsArray, IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { PostItem } from './post.model';
import { Expose, Type } from 'class-transformer';

export class Group {
  @Expose()
  @IsString()
  groupId: string;

  @Expose()
  @IsString()
  creatorId: string;

  @Expose()
  @IsString()
  ownerId: string;

  @Expose()
  @IsString()
  groupTitle: string;

  @Expose()
  @IsNumber()
  totalMembers: number;

  @Expose()
  members: Array<string>;

  @Expose()
  @IsUrl()
  groupPictureUrl: string;

  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => PostItem)
  posts: PostItem[];

  @Expose()
  @IsNumber()
  totalPosts: number;
}
