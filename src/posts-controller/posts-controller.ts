import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotesAppAuthGuard } from 'libs/guards/auth.guard';

@Controller({
  path: 'posts',
})
@UseGuards(NotesAppAuthGuard)
export class PostsController {

  @Get()
  getAllPostsByGroup() {
    return 'IMPLEMENTATAION REQUIRED: Get all  *P O S T S*  by GroupId';
  }
}
