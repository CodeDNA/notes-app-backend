import { IsBoolean, IsNotEmpty } from 'class-validator';
import { PostIdentifier } from './posts-dto/post-identifier';

export class MarkPostItemDto extends PostIdentifier {
  @IsBoolean()
  @IsNotEmpty()
  markAsCompleted: boolean;
}
