import { Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from '../../services/user.service';

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private readonly userService: UserService) {}

  dummyUser = {};

  @Get('getUser')
  getUserDetailsbyId(@Req() request: Request) {
    return 'IMPLEMENTATAION REQUIRED: Get  *U S E R*  by UserId';
  }

  @Post('add')
  async addNewUser() {
    // TODO: Test implementation complete. Add services and repositories next.
    return await this.userService.addNewUser();
  }
}
