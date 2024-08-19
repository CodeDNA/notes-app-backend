import { PartialType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UpdateDto extends PartialType(UserDto) {}
