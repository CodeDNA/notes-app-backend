import { Controller, Delete, Get, Param, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { NotesExecutionContext } from 'src/authentication/decorator/notes-execution-context.decorator';

@Controller({
  path: 'users',
})
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/id/:userId')
  async getUserById(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Get('/username/:userName')
  async getUserByUserName(@Param('userName') userName: string) {
    return await this.userService.getUserByUserName(userName);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string, @NotesExecutionContext() context: any) {
    if (context.userId !== userId) throw new UnauthorizedException();
    return await this.userService.deleteUserById(userId);
  }
}
