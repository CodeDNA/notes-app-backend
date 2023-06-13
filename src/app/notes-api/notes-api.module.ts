import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts-controller/posts-controller';
import { UsersController } from './controllers/user-controler/user-controller';
import { GroupsController } from './controllers/groups-controller/groups-controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDto, UserSchema } from './dto/user.dto';
import { GroupDto, GroupsSchema } from './dto/group.dto';
import { UserService } from './services/user.service';
import { GroupsService } from './services/groups.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserDto.name,
        schema: UserSchema,
        collection: UserDto.name,
      },

      {
        name: GroupDto.name,
        schema: GroupsSchema,
        collection: GroupDto.name,
      },
    ]),
  ],
  providers: [UserService, GroupsService],
  controllers: [PostsController, UsersController, GroupsController],
})
export class NotesModule {}
