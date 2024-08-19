import { Module } from '@nestjs/common';
import { GroupsService } from './services/groups.service';
import { GroupsController } from './controllers/groups-controller';
import { Group, GroupsSchema } from './dto/group.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { PostsController } from './controllers/posts-controller';
import { GroupsRepository } from './repository/groups.repository';
import { GroupsPostProcessorService } from './services/groups-post-processor.service';
import { PostService } from './services/posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Group.name,
        schema: GroupsSchema,
        collection: Group.name,
      },
    ]),
    UsersModule,
  ],
  providers: [GroupsService, GroupsRepository, PostService, GroupsPostProcessorService],
  controllers: [GroupsController, PostsController],
  exports: [],
})
export class GroupsModule {}
