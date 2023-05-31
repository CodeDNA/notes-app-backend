import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts-controller/posts-controller';
import { UsersController } from './controllers/user-controler/user-controller';
import { GroupsController } from './controllers/groups-controller/groups-controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDto, UserSchema } from './dto/user-dto';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserDto.name,
        schema: UserSchema,
        collection: UserDto.name,
      },
    ]),
  ],
  providers: [UserService],
  controllers: [PostsController, UsersController, GroupsController],
})
export class NotesModule {}
