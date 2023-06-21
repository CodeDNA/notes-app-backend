import { IsNotEmpty, IsString } from 'class-validator';

export class PostIdentifier {
  @IsString()
  @IsNotEmpty()
  groupId: string;

  @IsString()
  @IsNotEmpty()
  postId: string;
}
