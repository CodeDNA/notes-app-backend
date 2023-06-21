import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/user-controller';
import { User, UserSchema } from './dto/user.model';
import { UsersRespository } from './repository/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: User.name,
      },
    ]),
  ],
  providers: [UserService, UsersRespository],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
