import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { GroupsService } from '../../services/groups.service';
import { UserService } from '../../services/user.service';
import { GroupDto } from '../../dto/group.dto';
import { PostDto } from '../../dto/post.dto';

@Controller({
  path: 'groups',
})
export class GroupsController {
  constructor(private readonly groupsService: GroupsService, private readonly userService: UserService) {}

  @Get(':userId')
  async getMyGroups(@Param('userId') userId: string) {
    return this.groupsService.getAllGroupsByUserId(userId);
  }

  @Post('create')
  async createNewGroup(@Body() group: GroupDto) {
    if (!group.creatorId) {
      throw new BadRequestException('Group can not be created without a user id!');
    }

    const isUserValid = await this.userService.isUserValid(group?.creatorId);
    if (!isUserValid) {
      throw new BadRequestException('Invlid User!');
    }
    const updatedGroup = await this.groupsService.createOrUpdateGroup(group);
    if (updatedGroup) {
      await this.userService.updateUserGroups(updatedGroup.ownerId, updatedGroup.groupId);
    }
    return updatedGroup;
  }

  // >> Need to update the user's group's array as well
  @Post('add-user')
  async addUserToGroup(@Body() request: { userId: string; groupId: string }) {
    const userId = request.userId;
    const groupId = request.groupId;

    const user = await this.userService.getUserById(userId);
    if (user) {
      const updatedGroup = await this.groupsService.addUserToGroup(userId, groupId);

      // . Update groups[] in User as as well.
      if (updatedGroup) {
        return await this.userService.updateUserGroups(userId, groupId);
      }
    }
    throw new NotFoundException('User to be added to the group does not exist');
  }

  @Post('remove-user')
  // todo: 1) Check if it is the last member 2) Check if it the a.owner, b.creator
  async removeUserFromGroup(@Body() request: { userId: string; groupId: string }) {
    const updatedGroup = await this.groupsService.removeUserFromGroup(request.userId, request.groupId);
    if (updatedGroup) {
      const user = await this.userService.getUserById(request.userId);
      const index = user.groups?.indexOf(request.groupId);

      if (index !== -1) {
        user.groups.splice(index, 1);
      }
      return await this.userService.addOrUpdateUser(user);
    }
    throw new BadRequestException('Error updating group!');
  }

  @Post('add-post')
  async addPost(@Body() post: PostDto) {
    return await this.groupsService.addPostToGroup(post);
  }

  @Post('delete-post')
  async deletePost(@Body() request: { userId: string; groupId: string; postId: string }) {
    return await this.groupsService.deletePostFromGroup(request.userId, request.groupId, request.postId);
  }

  @Post('mark-complete')
  async markPostComplete(@Body() request: { userId: string; groupId: string; postId: string }) {
    return await this.groupsService.markPostAsComplete(request.userId, request.groupId, request.postId);
  }
}
