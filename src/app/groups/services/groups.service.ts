import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Group } from '../dto/group.model';
import { v4 as uuid } from 'uuid';
import { UserService } from 'src/app/users/services/user.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { plainToClass } from 'class-transformer';
import { GroupsRepository } from '../repository/groups.repository';

@Injectable()
export class GroupsService {
  constructor(private readonly userService: UserService, private readonly groupsRepository: GroupsRepository) {} // TODO: Make use of userService to update users (currently used in the groups controller)

  public async createGroup(context: any, group: CreateGroupDto) {
    const newGroup = plainToClass(Group, group);
    newGroup.groupId = uuid();
    newGroup.creatorId = context.userId;
    newGroup.ownerId = context.userId;
    newGroup.members = [context.userId.toString()];
    newGroup.posts = [];
    return await this.groupsRepository.createGroup(newGroup);
  }

  public async deleteGroup(context: any, groupId: string) {
    //  Only the owner can delete a group
    const groupToDelete = await this.getGroupById(groupId);
    if (!groupToDelete) throw new NotFoundException('Group does not exist');
    if (groupToDelete.ownerId !== context.userId) throw new UnauthorizedException();

    const members = groupToDelete.members;

    const deleteResult = await this.groupsRepository.deleteGroup(groupId);
    if (deleteResult && deleteResult.deletedCount === 0) {
      throw new InternalServerErrorException('Something went wrong while deleting the group. Please try again');
    }

    //TODO: Update users-groups array
    for (let index = 0; index < members.length; index++) {
      // this.userService.removeGroupFromUser(); // TODO: TBI FIX THIS
    }
    return deleteResult;
  }

  public async changeGroupOwner() {
    // TBI: Replace the owner Id with a new Id.
  }

  public async addUserToGroup(context: any, userId: string, groupId: string) {
    const group = await this.getGroupById(groupId);
    if (!group) throw new NotFoundException('Group not found!');

    // Check if the requester who is adding a new user is already a group member.
    const isRequesterAMember = group.members.indexOf(context.userId) !== -1;
    if (!isRequesterAMember) throw new UnauthorizedException('User must be a member to add a new user');

    const user = await this.userService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found!');

    const index = group.members.indexOf(userId);
    if (index !== -1) throw new BadRequestException('User already exists in the Group!');

    group.members.push(userId.toString());
    group.totalMembers += 1;

    const updatedGroup = await this.groupsRepository.updateGroup(group);
    if (!updatedGroup) throw new InternalServerErrorException('Failed to add user to the group');

    return await this.userService.updateUserGroups(userId, groupId);
  }

  public async removeUserFromGroup(context: any, userId: string, groupId: string) {
    const indexOfUser = await this.doesUserExistInGroup(userId, groupId);
    if (indexOfUser === -1) throw new BadRequestException('User does not exist in this group');

    const group = await this.getGroupById(groupId);
    if (group.ownerId !== context.userId) throw new UnauthorizedException('You are not authorized to perform this action');

    group.members.splice(indexOfUser, 1);
    group.totalMembers -= 1;

    const updatedGroup = await this.groupsRepository.updateGroup(group);
    if (!updatedGroup) throw new InternalServerErrorException('Error updating group');

    const updatedUser = await this.userService.removeGroupFromUser(userId, groupId);
    if (!updatedUser) throw new InternalServerErrorException("Error Updating user's groups");

    return `User "${updatedUser.userName}" has been successfully removed from the group "${group.groupTitle}"`;
  }

  public async getGroupsOwnedByMe(userId: string) {
    return await this.groupsRepository.getGroupsOwnedByMe(userId);
  }

  public async getMyGroups(userId: string) {
    const user = await this.userService.getUserById(userId);
    const groupIds = user.groups;
    return this.groupsRepository.getGroupsByIds(groupIds);
  }

  public async getGroupById(groupId: string) {
    const groups = await this.groupsRepository.getGroupsByIds([groupId]);
    return groups[0];
  }

  private async doesUserExistInGroup(userId: string, groupId: string): Promise<number> {
    const group = await this.getGroupById(groupId);
    if (!group) {
      throw new BadRequestException('Group does not exist!');
    }
    const index = group?.members?.indexOf(userId);
    return index;
  }
}
