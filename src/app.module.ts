import { Module } from '@nestjs/common';
import { NotesModule } from './app/notes-api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://parkerpunj:xS28gWlglbmZ0XCv@notes-app-db.eqymq1z.mongodb.net/',
    ),
    NotesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
