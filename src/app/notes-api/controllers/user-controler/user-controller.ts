import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../dto/user.dto';

@Controller({
  path: 'users',
})
export class UsersController {

  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Post('add')
  async addNewUser(@Body() request: UserDto) {
    return await this.userService.addOrUpdateUser(request);
  }


  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUserById(userId);
  }

}
