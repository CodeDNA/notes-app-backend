import { Module } from '@nestjs/common';
import { GroupsService } from './services/groups.service';
import { GroupsController } from './controllers/groups-controller';
import { GroupDto, GroupsSchema } from './dto/group.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GroupDto.name,
        schema: GroupsSchema,
        collection: GroupDto.name,
      },
    ]),
    UsersModule,
  ],
  providers: [GroupsService],
  controllers: [GroupsController],
  exports: [],
})
export class GroupsModule {}
