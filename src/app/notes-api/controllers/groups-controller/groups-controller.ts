import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller({
  path: 'groups',
})
export class GroupsController {
  @Get()
  getAllGroupsByUserId() {
    return 'IMPLEMENTATAION REQUIRED: Fetch all users associated with a users | Returns all  *GROUPS*  by userID';
  }
}
