import { Controller, Get, Req } from '@nestjs/common';

@Controller({
  path: 'users',
})
export class UsersController {

  @Get()
  getUserDetailsbyId(@Req() request: Request) {
    return 'IMPLEMENTATAION REQUIRED: Get  *U S E R*  by UserId';
  }
}
