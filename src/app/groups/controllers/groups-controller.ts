import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { UserService } from 'src/app/users/services/user.service';
import { NotesExecutionContext } from 'src/libs/decorators/notes-execution-context.decorator';
import { CreateGroupDto } from '../dto/create-group.dto';
import { Serialize } from 'src/libs/interceptors/serialize.interceptor';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { GroupResponseDto } from '../dto/group-response.dto';

@Controller({
  path: 'groups',
})
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService, private readonly userService: UserService) {}

  // * Fetch all groups where I am a member
  @Get()
  @Serialize(GroupResponseDto)
  async getMyGroups(@NotesExecutionContext() context: any) {
    return this.groupsService.getMyGroups(context.userId);
  }

  // * Fetches all groups created by me (requestContext.user).
  @Get('my-groups')
  @Serialize(GroupResponseDto)
  async getGroupsOwnedByMe(@NotesExecutionContext() context: any) {
    return this.groupsService.getGroupsOwnedByMe(context.userId);
  }

  @Post('create')
  @Serialize(GroupResponseDto)
  async createNewGroup(@Body() group: CreateGroupDto, @NotesExecutionContext() context: any) {
    const isUserValid = await this.userService.isUserValid(context.userId);
    if (!isUserValid) {
      throw new BadRequestException('Invalid User!');
    }
    const updatedGroup = await this.groupsService.createGroup(context, group);
    if (updatedGroup) {
      await this.userService.updateUserGroups(updatedGroup.ownerId, updatedGroup.groupId);
    }
    return updatedGroup;
  }

  // FIXME: Deleting a group does not remove it from the groups array in 'users' object
  @Delete(':groupId')
  deleteGroup(@Param('groupId') groupId: string, @NotesExecutionContext() context: any) {
    return this.groupsService.deleteGroup(context, groupId);
  }

  @Post('add-user')
  @Serialize(GroupResponseDto)
  async addUserToGroup(@Body() request: { userId: string; groupId: string }, @NotesExecutionContext() context: any) {
    const { userId, groupId } = request;
    return await this.groupsService.addUserToGroup(context, userId, groupId);
  }

  // * Remove a user from a group
  @Post('remove-user')
  // TODO: 1) Check if it is the last member 2) Check if it the a.owner, b.creator
  async removeUserFromGroup(@Body() request: { userId: string; groupId: string }, @NotesExecutionContext() context: any) {
    const { userId, groupId } = request;
    return await this.groupsService.removeUserFromGroup(context, userId, groupId);
  }
}
