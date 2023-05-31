import { Module } from '@nestjs/common';
import { NotesModule } from './app/notes-api/notes-api.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://parkerpunj:xS28gWlglbmZ0XCv@notes-app-db.eqymq1z.mongodb.net/',
    ),
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
