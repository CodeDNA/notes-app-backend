import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostItemDto {
  @IsString()
  @IsNotEmpty()
  groupId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
