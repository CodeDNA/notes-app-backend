import { Module } from '@nestjs/common';
import { NotesModule } from './app/notes-api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './authentication/auth.module';
import { DatabaseConnectionString } from './secrets/secretsDB';

@Module({
  imports: [
    MongooseModule.forRoot(
      DatabaseConnectionString
    ),
    NotesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
