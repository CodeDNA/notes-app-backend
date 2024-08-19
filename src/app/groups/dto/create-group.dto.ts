import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  groupTitle: string;
}
