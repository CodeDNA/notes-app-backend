import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './user-controler/user-controller';
import { PostsController } from './posts-controller/posts-controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, PostsController],
  providers: [AppService],
})
export class AppModule {}
