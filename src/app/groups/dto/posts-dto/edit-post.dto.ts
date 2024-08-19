import { IsNotEmpty, IsString } from 'class-validator';
import { PostIdentifier } from './post-identifier';

export class EditPostDto extends PostIdentifier {
  @IsString()
  @IsNotEmpty()
  content: string;
}
