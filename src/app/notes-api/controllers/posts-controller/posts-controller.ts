import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotesAppAuthGuard } from '@authentication-guard';
import { GroupsService } from '../../services/groups.service';
import { UserService } from '../../services/user.service';

@Controller({
  path: 'posts',
})
@UseGuards(NotesAppAuthGuard)
export class PostsController {
  constructor(private readonly groupsService: GroupsService, private readonly userService: UserService) {}

  @Get()
  getAllPostsByGroupId() {
    return 'IMPLEMENTATAION REQUIRED: Get all  *P O S T S*  by GroupId';
  }
}
