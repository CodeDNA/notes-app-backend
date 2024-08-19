import { Injectable } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { PostService } from './posts.service';

@Injectable()
export class GroupsPostProcessorService {
  constructor(private readonly groupsService: GroupsService, private readonly postService: PostService) {}
}
