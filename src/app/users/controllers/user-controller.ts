import { Controller, Delete, Get, Param, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { NotesExecutionContext } from 'src/libs/decorators/notes-execution-context.decorator';
import { UserResponseDto } from '../dto/user-response.dto';
import { Serialize } from 'src/libs/interceptors/serialize.interceptor';
@Controller({
  path: 'users',
})
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Serialize(UserResponseDto)
  @Get('my-profile')
  async myProfile(@NotesExecutionContext() context: any) {
    return await this.userService.getUserById(context.userId);
  }

  @Serialize(UserResponseDto)
  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Serialize(UserResponseDto)
  @Get('/username/:userName')
  async getUserByUserName(@Param('userName') userName: string) {
    return await this.userService.getUserByUserName(userName);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string, @NotesExecutionContext() context: any) {
    if (context.userId !== userId) throw new UnauthorizedException('You are unauthorized to perform this action');
    return await this.userService.deleteUserById(userId);
  }
}
